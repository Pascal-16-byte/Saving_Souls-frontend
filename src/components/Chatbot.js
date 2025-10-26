import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [tier, setTier] = useState(1);

  useEffect(() => {
    // Fetch user tier (optional: poll or use context)
    const fetchUser = async () => {
      const res = await axios.get('http://localhost:8000/api/onboarding/', {  // Adjust endpoint if needed
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTier(res.data.tier);
    };
    fetchUser();
  }, []);

  const handleSend = async () => {
    if (!input) return;
    setMessages([...messages, { text: input, from: 'You' }]);
    try {
      const res = await axios.post('http://localhost:8000/api/chatbot/', { prompt: input }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessages([...messages, { text: res.data.response, from: 'Bot' }]);
      if (tier === 2) alert('Tier 2 unlocked! Access the feed.');
    } catch (error) {
      alert('Error in chatbot');
    }
    setInput('');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Chatbot (Tier 1)</Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${msg.from}: ${msg.text}`} />
          </ListItem>
        ))}
      </List>
      <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for a prompt or exercise..." />
      <Button onClick={handleSend} variant="contained">Send</Button>
    </Container>
  );
};

export default Chatbot;