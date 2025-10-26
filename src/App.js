import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Chatbot from './components/Chatbot';
import Feed from './components/Feed';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;