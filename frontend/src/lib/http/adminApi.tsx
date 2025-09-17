// lib/http/adminApi.ts
import Player from "@/models/interfaces/player";
import { api } from "./apiClient";
import BlogPost from "@/models/interfaces/blogPost";

// Players
export const getPlayerRequests = (signal?: AbortSignal) =>
  api.get<Player[]>("/players/requests", { signal }).then((r) => r.data);

export const approvePlayer = (id: string, signal?: AbortSignal) =>
  api.put<void>(`/players/${encodeURIComponent(id)}/approve`, undefined, { signal });

export const rejectPlayer = (id: string, signal?: AbortSignal) =>
  api.delete<void>(`/players/${encodeURIComponent(id)}/reject`, { signal });

export const getActivePlayers = (signal?: AbortSignal) =>
  api.get<Player[]>("/players/active-players", { signal }).then((r) => r.data);

export const getRoster = (signal?: AbortSignal) =>
  api.get<Player[]>("/players/roster", { signal }).then((r) => r.data);

// Blog posts
export const listBlogPosts = (signal?: AbortSignal) =>
  api.get<{ posts: BlogPost[] }>("/blog-posts", { signal }).then((r) => r.data.posts ?? []);

export const editBlogPost = (id: string, body = {}, signal?: AbortSignal) =>
  api.put<void>(`/blog-posts/${encodeURIComponent(id)}/edit`, body, { signal });

export const deleteBlogPost = (id: string, signal?: AbortSignal) =>
  api.delete<void>(`/blog-posts/${encodeURIComponent(id)}`, { signal });
