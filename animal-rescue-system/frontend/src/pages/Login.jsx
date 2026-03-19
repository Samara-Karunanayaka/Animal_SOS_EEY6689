import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Avatar,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addNotification } = useNotification();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      addNotification({
        type: 'success',
        title: 'Welcome Back!',
        message: 'Successfully logged in',
      });
      navigate(from);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Replace with your actual Google OAuth URL
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleFacebookLogin = () => {
    // Replace with your actual Facebook OAuth URL
    window.location.href = 'http://localhost:5000/api/auth/facebook';
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4)',
          },
        }}
      >
        {/* Logo */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 60,
              height: 60,
            }}
          >
            <PetsIcon sx={{ fontSize: 40 }} />
          </Avatar>
        </Box>

        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" paragraph>
          Sign in to continue saving lives
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box textAlign="right" mb={2}>
            <Button 
              color="primary" 
              size="small"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </Button>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              mb: 2,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Social Login */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{
                py: 1.5,
                height: 48,
                borderColor: '#790a2b',
                color: 'text.primary',
                '&:hover': {
                  borderColor: '#4285f4',
                  backgroundColor: 'rgba(66, 133, 244, 0.04)',
                },
              }}
            >
              Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookLogin}
              disabled={loading}
              sx={{
                py: 1.5,
                height: 48,
                borderColor: '#790a2b',
                color: 'text.primary',
                '&:hover': {
                  borderColor: '#1877f2',
                  backgroundColor: 'rgba(63, 5, 37, 0.04)',
                },
              }}
            >
              Facebook
            </Button>
          </Box>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/register')}
                sx={{ 
                  textTransform: 'none', 
                  p: 0, 
                  minWidth: 'auto',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign up here
              </Button>
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
              By signing in, you agree to our Terms and Privacy Policy
            </Typography>
          </Box>
        </Box>

        {/* Citizen Note */}
        <Alert 
          severity="info" 
          sx={{ 
            mt: 3,
            '& .MuiAlert-message': {
              width: '100%',
            }
          }}
        >
          <Typography variant="body2">
            👤 Citizens don't need to login! You can report animals and track cases without an account.
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
};

export default Login;