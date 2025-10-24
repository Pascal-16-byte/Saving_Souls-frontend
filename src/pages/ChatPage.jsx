import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

function ChatPage(){
  const [anonId] = useState(() => "anon-" + Math.random().toString(36).slice(2,9));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  async function send(){
    if(!message) return;
    const userMsg = { role: "user", text: message };
    setMessages(m => [...m, { from: "user", text: message }]);
    setMessage("");
    setLoading(true);
    try{
      const res = await axios.post(`${API_BASE}/chatbot/`, { anon_id: anonId, message });
      const reply = res.data.reply;
      setMessages(m => [...m, { from: "bot", text: reply }]);
    }catch(e){
      setMessages(m => [...m, { from: "bot", text: "Sorry, something went wrong." }]);
    }finally{ setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded shadow p-4 h-96 overflow-auto">
        {messages.map((m,i)=>(
          <div key={i} className={`mb-3 ${m.from==="bot" ? "text-left" : "text-right"}`}>
            <div className={`inline-block p-2 rounded ${m.from==="bot" ? "bg-gray-100" : "bg-blue-100"}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex">
        <input className="flex-1 p-2 border rounded" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write to the chatbot..." />
        <button onClick={send} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
