import React, {useEffect, useState} from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

function StoriesPage(){
  const [stories, setStories] = useState([]);
  useEffect(()=>{
    axios.get(`${API_BASE}/stories/`).then(res => setStories(res.data));
  }, []);
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Stories</h2>
      <div className="space-y-4">
        {stories.length === 0 && <div className="text-gray-500">No stories yet.</div>}
        {stories.map(s => (
          <div key={s.id} className="p-4 bg-white rounded shadow">
            <div className="text-gray-600 text-sm mb-2">Posted anonymously • {new Date(s.created_at).toLocaleString()}</div>
            <div>{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoriesPage;
