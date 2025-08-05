import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import Player from '../models/interfaces/player';
import { UUID } from 'crypto';
import BlogPost from '@/models/interfaces/blogPost';



export default function HomePage() {
  const API_BASE = "http://localhost:8000";
  const [playerRequests, setPlayerRequests] = useState<Player[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const handleApprove = async (playerId: UUID) => {
  try {
    await axios.put(`${API_BASE}/players/${playerId}/approve`);
    setPlayerRequests(prev => prev.filter(p => p.id !== playerId));
  } catch (err) {
    console.error("Failed to approve player:", err);
  }
};

const handleReject = async (playerId: UUID) => {
  try {
    await axios.delete(`${API_BASE}/players/${playerId}/reject`);
    setPlayerRequests(prev => prev.filter(p => p.id !== playerId));
  } catch (err) {
    console.error("Failed to reject player:", err);
  }
};

  // const handleBlogPost = async () => {
  //   // Navigate to the blog post creation page
  //   try {
  //     await axios.post(`${API_BASE}/blog-posts/create`, {
        
  //     )
  //   }
  // };

  const handleBlogPostEdit = async (blogId: UUID) => {
    // Navigate to the blog post edit page
    try {
      await axios.put(`${API_BASE}/blog-posts/${blogId}/edit`);
      // Optionally refresh the blog posts list
    } catch (err) {
      console.error("Failed to edit blog post:", err);
    }
  };


  const handleBlogDelete = async (blogId: UUID) => {
    try {
      await axios.delete(`${API_BASE}/blog-posts/${blogId}`);
      // Optionally refresh the blog posts list
      
    } catch (err) {
      console.error("Failed to delete blog post:", err);
    }
  };

  useEffect(() => {
  const fetchPlayerRequests = axios.get('http://localhost:8000/players/requests');
  const fetchBlogPosts = axios.get('http://localhost:8000/blog-posts');

  Promise.all([fetchPlayerRequests, fetchBlogPosts])
    .then(([playerRes, blogRes]) => {
      setPlayerRequests(playerRes.data);
      setBlogPosts(blogRes.data.posts); // create and manage this state
    })
    .catch(err => console.error("Failed to fetch data", err))
    .finally(() => setLoading(false));
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Soccer Ball Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-8 h-8 bg-black rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-black rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-black rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 bg-black rounded-full"></div>
      </div>

      {/* Top Banner */}
      <div className="w-full h-64 relative shadow-lg rounded-b-3xl overflow-hidden">
        <Image
          src="/images/Banner.jpg"
          alt="Disston City Soccer Club Banner"
          fill
          priority
          className="object-contain"
        />
        {/* Banner Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto py-8 px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Disston City Soccer Club</h1>
          <p className="text-xl text-gray-600 mb-6">Admin Dashboard</p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">

          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-blue-600 mb-2">25</div>
            <div className="text-gray-600">Players</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-green-600 mb-2">2</div>
            <div className="text-gray-600">Leagues</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
            <div className="text-gray-600">Titles</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
            <div className="text-gray-600">Seasons</div>
          </div>
        </div>

        {/* Player Requests */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Player Requests</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : playerRequests.length === 0 ? (
            <p className="text-gray-500">No pending player requests.</p>
          ) : (
            <div className="space-y-4">
              {playerRequests.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="font-semibold">{player.first_name} {player.last_name}</div>
                    <div className="text-sm text-gray-500">{player.position}</div>
                    <div className="text-sm text-gray-500">#{player.jersey_number}</div>
                    <div>
                      <button onClick={() => handleApprove(player.id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">Accept</button>
                      <button onClick={() => handleReject(player.id)} className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>



        {/* Upcoming Matches */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⚽ Upcoming Matches</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">Sun, Dec 15</div>
                <div className="font-semibold">Disston City vs </div>
              </div>
              <div className="text-sm text-gray-500">2:00 PM - Suncoast League</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">Sun, Dec 22</div>
                <div className="font-semibold">Disston City vs </div>
              </div>
              <div className="text-sm text-gray-500">3:30 PM - Mexican League</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">Sun, Dec 29</div>
                <div className="font-semibold">Disston City vs </div>
              </div>
              <div className="text-sm text-gray-500">1:00 PM - Suncoast League</div>
            </div>
          </div>
        </div>
        

        {/* Club News */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📰 Club News</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : blogPosts.length === 0 ? (
            <div className="flex flex-row items-center space-y-4 justify-between">
              <p className="text-gray-500">No blog posts available.</p>
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">Approve</button>
            </div>
            
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{post.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</span>
                    <div>
                      <button onClick={() => handleBlogPostEdit(post.id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">Approve</button>
                      <button onClick={() => handleBlogDelete(post.id)} className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}


          
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-xl shadow-2xl p-8 text-center text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center space-x-4">
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
