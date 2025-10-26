import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Alert,
  Box,
  Paper,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for soothing colors
const theme = createTheme({
  palette: {
    primary: { main: '#4A90E2' }, // Soft blue for buttons
    secondary: { main: '#50C878' }, // Gentle green for highlights
    background: { default: '#1A1F2E', paper: '#2A2F3E' }, // Dark calm background
    text: { primary: '#E0E0E0' }, // Light text for contrast
  },
  typography: {
    h4: { fontWeight: 600, color: '#50C878' },
    body1: { color: '#D3D3D3' },
  },
});

const Onboarding = () => {
  const [formData, setFormData] = useState({ country: '', age_confirmed: false, anonymous_handle: '' });
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/onboarding/', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/chatbot');
    } catch (error) {
      alert('Onboarding failed. Please try again or contact support.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 2, backgroundColor: 'background.paper' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Saving Souls
            </Typography>
            <Typography variant="body1" color="text.primary">
              Start your journey with a safe and supportive space.
            </Typography>
          </Box>

          {showDisclaimer && (
            <Alert
              severity="info"
              onClose={() => setShowDisclaimer(false)}
              sx={{ mb: 3, backgroundColor: '#2E3A4E', color: '#E0E0E0' }}
            >
              <Typography variant="body2">
                Disclaimer: This platform provides peer support, not professional medical advice. In emergencies, call your local helpline (e.g., India: 1-800-425-1111). By proceeding, you consent to content moderation and data usage for safety.
              </Typography>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              variant="outlined"
              sx={{ mb: 3, backgroundColor: '#3A4050', borderRadius: 1 }}
              InputProps={{ style: { color: '#E0E0E0' } }}
              InputLabelProps={{ style: { color: '#A0A0A0' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="age_confirmed"
                  checked={formData.age_confirmed}
                  onChange={handleInputChange}
                  required
                  sx={{ color: '#50C878', '&.Mui-checked': { color: '#50C878' } }}
                />
              }
              label={<Typography variant="body1">Confirm I am 18+</Typography>}
              sx={{ mb: 3, color: '#D3D3D3' }}
            />
            <TextField
              fullWidth
              label="Anonymous Handle (optional)"
              name="anonymous_handle"
              value={formData.anonymous_handle}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mb: 4, backgroundColor: '#3A4050', borderRadius: 1 }}
              InputProps={{ style: { color: '#E0E0E0' } }}
              InputLabelProps={{ style: { color: '#A0A0A0' } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
            >
              Submit and Consent
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.primary">
              Your privacy and safety are our priority. Proceed with care.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Onboarding;