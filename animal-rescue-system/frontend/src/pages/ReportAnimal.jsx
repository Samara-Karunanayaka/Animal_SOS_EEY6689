import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Alert,
  Grid,
  Chip,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  Avatar,
  Fade,
  Grow,
  Zoom,
} from '@mui/material';
import {
  PhotoCamera,
  LocationOn,
  Send,
  Mic,
  Stop,
  CheckCircle,
  Error as ErrorIcon,
  Pets as PetsIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AnimalDetection from '../components/ML/AnimalDetection';
import VoiceAnalyzer from '../components/ML/VoiceAnalyzer';
import { useNotification } from '../contexts/NotificationContext';

const steps = ['Photos & Detection', 'Location', 'Description', 'Review & Submit'];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ReportAnimal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [detectionResult, setDetectionResult] = useState(null);
  const [voiceAnalysis, setVoiceAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const { addNotification } = useNotification();

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleLocationSelect = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: '📍 Current Location',
          });
          setLoading(false);
          addNotification({
            type: 'success',
            title: 'Location Found',
            message: 'Your location has been detected successfully!',
          });
        },
        (error) => {
          // Fallback to default location
          setLocation({
            lat: 6.9271,
            lng: 80.7789,
            address: '📍 Colombo (Default)',
          });
          setLoading(false);
          addNotification({
            type: 'warning',
            title: 'Location Error',
            message: 'Using default location. Please enable GPS for accurate tracking.',
          });
        }
      );
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Report Submitted!',
        message: 'Thank you for helping this animal. A volunteer has been notified.',
      });
      
      setLoading(false);
      setActiveStep(0);
      setImages([]);
      setImagePreviews([]);
      setLocation(null);
      setDescription('');
      setDetectionResult(null);
      setVoiceAnalysis(null);
    }, 2000);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grow in={true} timeout={500}>
            <Box>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'rgba(255, 107, 107, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'rgba(255, 107, 107, 0.1)',
                  },
                }}
                component="label"
              >
                <VisuallyHiddenInput
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <PhotoCamera sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Click to Upload Images
                </Typography>
                <Typography color="textSecondary">
                  or drag and drop (Max 5 images)
                </Typography>
              </Box>

              {imagePreviews.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Images ({imagePreviews.length})
                  </Typography>
                  <Grid container spacing={1}>
                    {imagePreviews.map((preview, index) => (
                      <Grid item key={index}>
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            backgroundImage: `url(${preview})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: 1,
                            border: '2px solid',
                            borderColor: 'primary.main',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {imagePreviews.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <AnimalDetection
                    image={images[0]}
                    onDetectionComplete={setDetectionResult}
                  />
                </Box>
              )}
            </Box>
          </Grow>
        );

      case 1:
        return (
          <Grow in={true} timeout={500}>
            <Box>
              <Button
                variant="contained"
                startIcon={<LocationOn />}
                onClick={handleLocationSelect}
                disabled={loading}
                sx={{ mb: 3 }}
              >
                {loading ? 'Detecting...' : 'Get Current Location'}
              </Button>

              {loading && <LinearProgress sx={{ mb: 2 }} />}

              {location && (
                <Fade in={true}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                          <CheckCircle />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">Location Selected</Typography>
                          <Typography color="textSecondary">
                            {location.address || `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="outlined"
                        startIcon={<MapIcon />}
                        fullWidth
                      >
                        View on Map
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              )}
            </Box>
          </Grow>
        );

      case 2:
        return (
          <Grow in={true} timeout={500}>
            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Describe the animal's condition, behavior, and any other important details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 3 }}
              />

              <VoiceAnalyzer
                isRecording={isRecording}
                onStartRecording={() => setIsRecording(true)}
                onStopRecording={() => setIsRecording(false)}
                onAnalysisComplete={setVoiceAnalysis}
              />

              {voiceAnalysis && (
                <Fade in={true}>
                  <Card sx={{ mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Voice Analysis Results
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography color="textSecondary" variant="caption">
                              Urgency Level
                            </Typography>
                            <Chip
                              label={voiceAnalysis.urgency}
                              color={voiceAnalysis.urgency === 'High' ? 'error' : 
                                     voiceAnalysis.urgency === 'Medium' ? 'warning' : 'success'}
                              sx={{ mt: 1 }}
                            />
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography color="textSecondary" variant="caption">
                              Sentiment
                            </Typography>
                            <Typography variant="body1">{voiceAnalysis.sentiment}</Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Fade>
              )}
            </Box>
          </Grow>
        );

      case 3:
        return (
          <Grow in={true} timeout={500}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Review Your Report
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      📸 Photos
                    </Typography>
                    <Typography>{images.length} image(s) uploaded</Typography>
                    {imagePreviews.length > 0 && (
                      <Box display="flex" gap={1} mt={1}>
                        {imagePreviews.slice(0, 3).map((preview, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 50,
                              height: 50,
                              backgroundImage: `url(${preview})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: 1,
                            }}
                          />
                        ))}
                        {imagePreviews.length > 3 && (
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              bgcolor: 'grey.100',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography variant="caption">
                              +{imagePreviews.length - 3}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      📍 Location
                    </Typography>
                    {location ? (
                      <Typography>
                        {location.address || `Coordinates: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
                      </Typography>
                    ) : (
                      <Typography color="error">No location selected</Typography>
                    )}
                  </Paper>
                </Grid>

                {detectionResult && (
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        🤖 AI Detection
                      </Typography>
                      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                        <Chip
                          icon={<PetsIcon />}
                          label={detectionResult.animalType}
                          color="primary"
                        />
                        <Chip
                          label={`Confidence: ${Math.round(detectionResult.confidence * 100)}%`}
                          variant="outlined"
                        />
                        <Chip
                          label={`Urgency: ${detectionResult.urgencyLevel}`}
                          color={detectionResult.urgencyLevel === 'High' ? 'error' : 
                                 detectionResult.urgencyLevel === 'Medium' ? 'warning' : 'success'}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                )}

                {description && (
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        📝 Description
                      </Typography>
                      <Typography>{description}</Typography>
                    </Paper>
                  </Grid>
                )}

                {!location && (
                  <Grid item xs={12}>
                    <Alert severity="error" icon={<ErrorIcon />}>
                      Please select a location before submitting
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grow>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Zoom in={true}>
        <Paper
          sx={{
            p: 4,
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
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 4,
            }}
          >
            Report an Animal in Need
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              disabled={activeStep === 0 || loading}
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </Button>

            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<Send />}
                  disabled={!location || loading}
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setActiveStep(activeStep + 1)}
                  disabled={
                    (activeStep === 0 && images.length === 0) ||
                    (activeStep === 1 && !location) ||
                    loading
                  }
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Zoom>

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255,255,255,0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <LinearProgress sx={{ width: 200, mb: 2 }} />
            <Typography>Processing your report...</Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default ReportAnimal;