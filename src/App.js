import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import StoriesPage from "./pages/StoriesPage";
import PostStoryPage from "./pages/PostStoryPage";
import ModeratorDashboard from "./pages/ModeratorDashboard";

function App(){
  return (
    <Router>
      <div className="min-h-screen p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">^_^Saving Souls^_^ (MVP)</h1>
          <nav className="mt-2 space-x-4">
            <Link to="/chat" className="text-blue-600">Chat</Link>
            <Link to="/stories" className="text-blue-600">Stories</Link>
            <Link to="/post" className="text-blue-600">Post</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/post" element={<PostStoryPage />} />
          <Route path="/" element={<ChatPage />} />
          <Route path="/moderator" element={<ModeratorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
