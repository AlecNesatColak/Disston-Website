/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HOMEPAGE_CONSTANTS from "../components/homepage/constants/homepage-constants";


import {
  approvePlayer,
  rejectPlayer,
  getPlayerRequests,
  listBlogPosts,
  editBlogPost,
  deleteBlogPost,
  getActivePlayers
} from "@/lib/http/adminApi";
import Player from "@/models/interfaces/player";
import BlogPost from "@/models/interfaces/blogPost";

// Query keys (centralize to avoid typos)
const QK = {
  playerRequests: ["playerRequests"] as const,
  blogPosts: ["blogPosts"] as const,
  activePlayers: ["activePlayers"] as const,
};

export default function AdminPage() {
  const qc = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reads (React Query handles cancellation, retry, caching, dedup)
  const {
    data: players = [],
    isLoading: activePlayersLoading,
    error: activePlayersError,
  } = useQuery({
    queryKey: QK.activePlayers,
    queryFn: ({ signal }) => getActivePlayers(signal),
  });


  const {
    data: Newplayers = [],
    isLoading: playersLoading,
    error: playersError,
  } = useQuery({
    queryKey: QK.playerRequests,
    queryFn: ({ signal }) => getPlayerRequests(signal),
  });

  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: QK.blogPosts,
    queryFn: ({ signal }) => listBlogPosts(signal),
  });

  const loading = playersLoading || postsLoading;

  // ---- Mutations with optimistic updates ----

  const approvePlayerMut = useMutation({
    mutationFn: (id: string) => approvePlayer(id),
    onMutate: async (id) => {
      setErrorMsg(null);
      await qc.cancelQueries({ queryKey: QK.playerRequests });
      const prev = qc.getQueryData<Player[]>(QK.playerRequests) || [];
      qc.setQueryData<Player[]>(QK.playerRequests, prev.filter((p) => p.id !== id));
      return { prev };
    },
    onError: (err: any, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK.playerRequests, ctx.prev); // rollback
      setErrorMsg(err?.message ?? "Failed to approve player.");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QK.playerRequests });
    },
  });

  const rejectPlayerMut = useMutation({
    mutationFn: (id: string) => rejectPlayer(id),
    onMutate: async (id) => {
      setErrorMsg(null);
      await qc.cancelQueries({ queryKey: QK.playerRequests });
      const prev = qc.getQueryData<Player[]>(QK.playerRequests) || [];
      qc.setQueryData<Player[]>(QK.playerRequests, prev.filter((p) => p.id !== id));
      return { prev };
    },
    onError: (err: any, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK.playerRequests, ctx.prev);
      setErrorMsg(err?.message ?? "Failed to reject player.");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QK.playerRequests });
    },
  });

  const approvePostMut = useMutation({
    mutationFn: (id: string) => editBlogPost(id, { status: "approved" }),
    onError: (err: any) => setErrorMsg(err?.message ?? "Failed to approve blog post."),
    onSettled: () => qc.invalidateQueries({ queryKey: QK.blogPosts }),
  });

  const deletePostMut = useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onMutate: async (id) => {
      setErrorMsg(null);
      await qc.cancelQueries({ queryKey: QK.blogPosts });
      const prev = qc.getQueryData<BlogPost[]>(QK.blogPosts) || [];
      qc.setQueryData<BlogPost[]>(
        QK.blogPosts,
        prev.filter((b) => b.id !== id)
      );
      return { prev };
    },
    onError: (err: any, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK.blogPosts, ctx.prev);
      setErrorMsg(err?.message ?? "Failed to delete blog post.");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: QK.blogPosts }),
  });

  const playersErrMsg = (playersError as any)?.message;
  const postsErrMsg = (postsError as any)?.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden"
    style={{ background: "linear-gradient(135deg, #2563eb 0%, #facc15 100%)" }}
    >
      {/* Error Banner */}
      {(errorMsg || playersErrMsg || postsErrMsg) && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded shadow">
          {errorMsg || playersErrMsg || postsErrMsg}
        </div>
      )}

      {/* Top Banner */}
      <div className="w-full h-64 relative shadow-lg rounded-b-3xl overflow-hidden">
        <Image src="/images/Banner.jpg" alt="Disston City Soccer Club Banner" fill priority className="object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Disston City Soccer Club
          </h1>
          <p className="text-xl text-gray-600 mb-6">Admin Dashboard</p>
        </div>

        {/* Quick Stats (placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600">
              <Link 
                href="/roster"
                className="block"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:text-white transition-colors duration-300">{players.length}</div>
                <div className="text-gray-600 group-hover:text-white transition-colors duration-300">{HOMEPAGE_CONSTANTS.quickStats.players.label}</div>
              </Link>
            </div>
            <Link href="/leagues" className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <div className="text-gray-600">{HOMEPAGE_CONSTANTS.quickStats.leagues.label}</div>
            </Link>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
              <div className="text-gray-600">{HOMEPAGE_CONSTANTS.quickStats.titles.label}</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">{HOMEPAGE_CONSTANTS.quickStats.seasons.label}</div>
            </div>
          </div>


        {/* Player Requests */}
        <section className="bg-white/90 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Player Requests</h2>
          {loading ? (
            <p className="text-gray-500">Loading…</p>
          ) : Newplayers.length === 0 ? (
            <p className="text-gray-500">No pending player requests.</p>
          ) : (
            <div className="space-y-4">
              {Newplayers.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold">
                      {p.first_name} {p.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{p.position}</div>
                    <div className="text-sm text-gray-500">#{p.jersey_number}</div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => approvePlayerMut.mutate(p.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-60"
                      disabled={approvePlayerMut.isPending}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectPlayerMut.mutate(p.id)}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-60"
                      disabled={rejectPlayerMut.isPending}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Club News */}
        <section className="bg-white/90 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📰 Club News</h2>
          {loading ? (
            <p className="text-gray-500">Loading…</p>
          ) : posts.length === 0 ? (
            <div className="flex items-center justify-between">
              <p className="text-gray-500">No blog posts available.</p>
              <Link href="/admin/blog/new" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Create Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{post.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</span>
                    <div>
                      <button
                        onClick={() => approvePostMut.mutate(post.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-60"
                        disabled={approvePostMut.isPending}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => deletePostMut.mutate(post.id)}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-60"
                        disabled={deletePostMut.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-xl shadow-2xl p-8 text-center text-white">
          <div className="flex justify-center">
            <Link href="/schedule" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              View Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, accent }: { title: string; value: number | string; accent: string }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-6 text-center">
      <div className={`text-3xl font-bold mb-2 ${accent}`}>{value}</div>
      <div className="text-gray-600">{title}</div>
    </div>
  );
}
