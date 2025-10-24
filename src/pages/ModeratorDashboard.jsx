import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

export default function ModeratorDashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({}); // track individual story loading

  useEffect(() => {
    fetchPendingStories();
  }, []);

  const fetchPendingStories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/stories/?status=pending`);
      setStories(res.data);
    } catch (err) {
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setActionLoading(prev => ({ ...prev, [id]: true }));
    try {
      await axios.post(`${API_BASE}/stories/${id}/${action}/`);
      setStories(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(`Error ${action} story:`, err);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Moderator Dashboard</h2>

      {loading && <div className="text-center text-gray-600">Loading pending stories...</div>}
      {!loading && stories.length === 0 && (
        <div className="text-center text-gray-500">No pending stories.</div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {stories.map(story => (
          <div
            key={story.id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-gray-500 text-sm mb-3">
              Posted anonymously • {new Date(story.created_at).toLocaleString()}
            </div>
            <div className="text-gray-800 mb-4">{story.content}</div>
            <div className="flex space-x-3">
              <button
                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors duration-200 disabled:opacity-50"
                disabled={actionLoading[story.id]}
                onClick={() => handleAction(story.id, "approve")}
              >
                {actionLoading[story.id] ? "..." : "Approve"}
              </button>
              <button
                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors duration-200 disabled:opacity-50"
                disabled={actionLoading[story.id]}
                onClick={() => handleAction(story.id, "reject")}
              >
                {actionLoading[story.id] ? "..." : "Reject"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
