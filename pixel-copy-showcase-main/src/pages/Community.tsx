// src/pages/Community.jsx
import React, { useState } from "react";
import { Heart, Users, MessageCircle, ThumbsUp } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    user: "Riya Sharma",
    time: "2h ago",
    content: "I just donated blood today! Feeling great to contribute 💉❤️",
    likes: 12,
    comments: [
      { id: 1, user: "Aman", text: "Amazing! Proud of you 👏" },
      { id: 2, user: "Sanya", text: "You inspire me to donate too!" },
    ],
  },
  {
    id: 2,
    user: "Rahul Mehta",
    time: "5h ago",
    content: "Looking for O+ donors in Pune. Please reach out if available 🙏",
    likes: 8,
    comments: [{ id: 1, user: "Neha", text: "Shared in my group!" }],
  },
];

export default function Community() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    const newEntry = {
      id: posts.length + 1,
      user: "You",
      time: "Just now",
      content: newPost,
      likes: 0,
      comments: [],
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2 mb-6">
        <Users className="h-6 w-6" /> Community Hub
      </h1>

      {/* Post Input */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <textarea
          className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-400 outline-none resize-none"
          rows="3"
          placeholder="Share your donation experience or request help..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={handleAddPost}
          className="mt-3 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Post
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">{post.user}</p>
              <p className="text-xs text-gray-500">{post.time}</p>
            </div>
            <p className="text-gray-700 mt-2">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1 hover:text-red-600 transition"
              >
                <ThumbsUp className="h-4 w-4" /> {post.likes}
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> {post.comments.length}
              </div>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="mt-3 pl-3 border-l border-gray-200 space-y-1">
                {post.comments.map((c) => (
                  <p key={c.id} className="text-sm">
                    <span className="font-semibold">{c.user}: </span>
                    {c.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
