import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Checkbox, FormControlLabel, Container, Typography, Alert } from '@mui/material';

const Onboarding = () => {
  const [formData, setFormData] = useState({ country: '', age_confirmed: false, anonymous_handle: '' });
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/onboarding/', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/chatbot');
    } catch (error) {
      alert('Onboarding failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Onboarding</Typography>
      {showDisclaimer && (
        <Alert severity="info" onClose={() => setShowDisclaimer(false)}>
          Disclaimer: This platform provides peer support, not professional medical advice. In emergencies, call local helplines. Consent to content moderation and data usage for safety.
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField label="Country" fullWidth required onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
        <FormControlLabel
          control={<Checkbox required onChange={(e) => setFormData({ ...formData, age_confirmed: e.target.checked })} />}
          label="Confirm I am 18+"
        />
        <TextField label="Anonymous Handle (optional)" fullWidth onChange={(e) => setFormData({ ...formData, anonymous_handle: e.target.value })} />
        <Button type="submit" variant="contained">Submit and Consent</Button>
      </form>
    </Container>
  );
};

export default Onboarding;