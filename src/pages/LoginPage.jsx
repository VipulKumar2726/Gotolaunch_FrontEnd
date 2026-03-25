import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      showNotification('Login successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setLocalError(errorMsg);
      showNotification(errorMsg, 'error');
    }
  };

  return (
    <AuthLayout>
      <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: '8px',
            color: '#212121',
          }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575' }}>
          Sign in to your account to continue
        </Typography>
      </Box>

      {localError && (
        <Alert severity="error" sx={{ marginBottom: '24px' }}>
          {localError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          placeholder="you@example.com"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          placeholder="••••••••"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            marginTop: '8px',
            height: '48px',
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
      </Box>

      <Box sx={{ marginTop: '24px', textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#757575' }}>
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to="/register"
            sx={{
              color: '#1976D2',
              textDecoration: 'none',
              fontWeight: 600,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
