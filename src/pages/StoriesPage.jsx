import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

function StoriesPage({ user }) {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/stories/`);
      setStories(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load stories.");
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleSubmit = async () => {
    if (!newStory.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/stories/`, {
        content: newStory,
        handle: user.handle || null,
        country: user.country,
      });
      setNewStory("");
      fetchStories();
    } catch (err) {
      console.error(err);
      setError("Failed to submit story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavBar user={user} />

      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Welcome {user.handle || "Anonymous"}!
        </h2>
        <p className="text-gray-600 mb-6">
          You are connected from {user.country}. Share your story below.
        </p>

        {/* New story submission */}
        <div className="mb-6">
          <textarea
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            rows={4}
            placeholder="Share your thoughts or experiences..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-2"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Story"}
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>

        {/* Story feed */}
        <div className="space-y-4">
          {stories.length === 0 && <div className="text-gray-500">No stories yet.</div>}
          {stories.map((s) => (
            <div key={s.id} className="p-4 bg-white rounded shadow">
              <div className="text-gray-600 text-sm mb-2">
                {s.handle || "Posted anonymously"} • {new Date(s.created_at).toLocaleString()}
              </div>
              <div>{s.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoriesPage;
