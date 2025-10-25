import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ user }) {
  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="font-bold text-lg">^_^Saving Souls^_^</div>
      <div className="space-x-4">
        <Link to="/stories" className="hover:underline">Stories</Link>
        <Link to="/chat" className="hover:underline">Chat</Link>
        {user && <span className="ml-4 text-sm">Hello, {user.handle || "Anonymous"}</span>}
      </div>
    </nav>
  );
}
