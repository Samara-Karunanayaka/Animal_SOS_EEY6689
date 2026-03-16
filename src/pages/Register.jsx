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
  Fade,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';

const steps = ['Account Type', 'Personal Info', 'Verification'];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addNotification } = useNotification();
  
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    accountType: 'citizen',
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    organization: '',
    licenseNumber: '',
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      // Validate personal info
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setError('');
      setActiveStep(2);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setError('');
  };

  const handleSubmit = async () => {
    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.name, formData.email, formData.password, formData.accountType);
      addNotification({
        type: 'success',
        title: 'Welcome!',
        message: 'Your account has been created successfully',
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              I want to register as:
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={formData.accountType}
                onChange={handleChange('accountType')}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: formData.accountType === 'citizen' ? 'primary.light' : 'transparent',
                    color: formData.accountType === 'citizen' ? 'white' : 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFormData({ ...formData, accountType: 'citizen' })}
                >
                  <FormControlLabel
                    value="citizen"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">👤 Citizen</Typography>
                        <Typography variant="body2" color={formData.accountType === 'citizen' ? 'white' : 'textSecondary'}>
                          Report animals and track rescue cases
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: formData.accountType === 'volunteer' ? 'primary.light' : 'transparent',
                    color: formData.accountType === 'volunteer' ? 'white' : 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFormData({ ...formData, accountType: 'volunteer' })}
                >
                  <FormControlLabel
                    value="volunteer"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">🦸 Volunteer</Typography>
                        <Typography variant="body2" color={formData.accountType === 'volunteer' ? 'white' : 'textSecondary'}>
                          Participate in rescue operations
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    bgcolor: formData.accountType === 'ngo' ? 'primary.light' : 'transparent',
                    color: formData.accountType === 'ngo' ? 'white' : 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFormData({ ...formData, accountType: 'ngo' })}
                >
                  <FormControlLabel
                    value="ngo"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">🏢 NGO / Organization</Typography>
                        <Typography variant="body2" color={formData.accountType === 'ngo' ? 'white' : 'textSecondary'}>
                          Manage rescue operations and animals
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <TextField
              fullWidth
              label="Full Name *"
              value={formData.name}
              onChange={handleChange('name')}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              margin="normal"
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
              label="Phone Number *"
              value={formData.phone}
              onChange={handleChange('phone')}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={handleChange('location')}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {formData.accountType === 'ngo' && (
              <>
                <TextField
                  fullWidth
                  label="Organization Name"
                  value={formData.organization}
                  onChange={handleChange('organization')}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="License Number"
                  value={formData.licenseNumber}
                  onChange={handleChange('licenseNumber')}
                  margin="normal"
                />
              </>
            )}

            <TextField
              fullWidth
              label="Password *"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              margin="normal"
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

            <TextField
              fullWidth
              label="Confirm Password *"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 2:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please verify your email to complete registration
            </Alert>

            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Verification Code
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                We've sent a 6-digit verification code to {formData.email}
              </Typography>
              <Grid container spacing={1} justifyContent="center">
                {[1, 2, 3, 4, 5, 6].map((digit) => (
                  <Grid item key={digit}>
                    <TextField
                      variant="outlined"
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: 'center', width: 40, height: 40 },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            <Box display="flex" alignItems="center" mb={2}>
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                color="primary"
              />
              <Typography variant="body2">
                I agree to the Terms of Service and Privacy Policy
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !agreeTerms}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Fade in={true}>
        <Paper
          sx={{
            p: 4,
            mt: 8,
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
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" paragraph>
            Join our community of animal lovers
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {getStepContent(activeStep)}

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ bgcolor: 'primary.main' }}
              >
                Next
              </Button>
            )}
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider>

          <Box textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none' }}
              >
                Sign in here
              </Button>
            </Typography>
          </Box>

          {/* Citizen Note */}
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              👤 Citizens can report animals without creating an account!
            </Typography>
          </Alert>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Register;