import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextareaAutosize, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/posts/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPosts(res.data);
      } catch (error) {
        alert('Error fetching posts');
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!newPost) return;
    try {
      const res = await axios.post('http://localhost:8000/api/posts/', { content: newPost, anonymous: true }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPosts([res.data, ...posts]);
      setNewPost('');
    } catch (error) {
      alert('Post failed moderation or error');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Anonymous Story Feed (Tier 2)</Typography>
      <TextareaAutosize minRows={3} placeholder="Share your story anonymously..." value={newPost} onChange={(e) => setNewPost(e.target.value)} style={{ width: '100%' }} />
      <Button onClick={handlePost} variant="contained">Post</Button>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText primary={post.content} secondary={`Anonymous - ${post.created_at}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Feed;