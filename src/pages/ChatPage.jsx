// src/pages/ChatPage.jsx
import React, { useState } from "react";
import NavBar from "../components/NavBar";

export default function ChatPage({ user }) {
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hey there 👋, how are you feeling today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [
      ...messages,
      { sender: "You", text: input },
      { sender: "AI", text: getAIResponse(input) }
    ];
    setMessages(newMessages);
    setInput("");
  };

  const getAIResponse = (text) => {
    const t = text.toLowerCase();
    if (t.includes("sad") || t.includes("down"))
      return "I'm sorry you're feeling low 😔. Want to talk about what’s been bothering you?";
    if (t.includes("happy") || t.includes("good"))
      return "That’s wonderful 😊! What made your day better?";
    return "I hear you. Tell me more about that.";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <NavBar user={user} />

      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">AI Support Chat</h2>

        <div className="bg-white p-4 rounded shadow-md h-[60vh] overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.sender === "You"
                  ? "bg-indigo-100 self-end ml-auto text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <div className="text-sm font-semibold">{msg.sender}</div>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="mt-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 rounded-r hover:bg-indigo-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
