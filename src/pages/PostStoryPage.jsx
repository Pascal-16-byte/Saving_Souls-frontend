import React, {useState} from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

export default function PostStoryPage(){
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(null);
  const anonId = "anon-" + (localStorage.getItem("anon") || Math.random().toString(36).slice(2,9));
  localStorage.setItem("anon", anonId);

  async function submit(){
    if(!content) return;
    try {
      const res = await axios.post(`${API_BASE}/stories/create/`, { anon_id: anonId, content });
      setStatus("Submitted! If content is flagged, it will be reviewed.");
      setContent("");
    } catch (e) {
      setStatus("Error submitting story.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Share your story anonymously</h2>
      <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full p-2 border rounded h-40" />
      <div className="mt-2">
        <button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded">Post</button>
      </div>
      {status && <div className="mt-2 text-sm text-gray-600">{status}</div>}
    </div>
  );
}
