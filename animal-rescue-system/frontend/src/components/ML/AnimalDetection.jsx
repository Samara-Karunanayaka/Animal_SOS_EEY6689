import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Alert,
  Grid,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Pets as PetsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Healing as HealingIcon,
} from '@mui/icons-material';

const AnimalDetection = ({ image, onDetectionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);

  const analyzeImage = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock ML detection results
    const mockResults = {
      animalType: ['Dog', 'Cat', 'Bird', 'Rabbit'][Math.floor(Math.random() * 4)],
      confidence: Math.random() * 0.3 + 0.7,
      condition: ['Critical', 'Injured', 'Weak', 'Healthy'][Math.floor(Math.random() * 4)],
      injuries: [
        'Visible wound on leg',
        'Signs of malnourishment',
        'Dehydrated',
        'No visible injuries',
        'Possible fracture',
        'Eye infection',
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      urgencyLevel: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      estimatedAge: ['Puppy/Kitten', 'Young', 'Adult', 'Senior'][Math.floor(Math.random() * 4)],
      breed: ['Labrador', 'Persian', 'German Shepherd', 'Mixed', 'Siamese', 'Beagle'][Math.floor(Math.random() * 6)],
      estimatedWeight: Math.floor(Math.random() * 30) + 5,
      behavior: ['Calm', 'Aggressive', 'Scared', 'Friendly', 'Confused'][Math.floor(Math.random() * 5)],
      recommendations: [
        'Immediate veterinary attention needed',
        'Provide food and water',
        'Keep warm',
        'Handle with care',
        'Contact nearest animal hospital',
      ].slice(0, Math.floor(Math.random() * 3) + 2),
    };
    
    setDetectionResult(mockResults);
    if (onDetectionComplete) {
      onDetectionComplete(mockResults);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (image) {
      analyzeImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const getUrgencyIcon = (level) => {
    switch (level) {
      case 'High':
        return <ErrorIcon color="error" />;
      case 'Medium':
        return <WarningIcon color="warning" />;
      case 'Low':
        return <CheckCircleIcon color="success" />;
      default:
        return null;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Critical':
        return 'error';
      case 'Injured':
        return 'warning';
      case 'Weak':
        return 'info';
      case 'Healthy':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <PetsIcon />
          </Avatar>
          <Typography variant="h6">AI Animal Detection</Typography>
        </Box>

        {loading ? (
          <Box my={3}>
            <LinearProgress />
            <Typography align="center" color="textSecondary" mt={2}>
              Analyzing image with AI...
            </Typography>
          </Box>
        ) : detectionResult ? (
          <Box>
            <Alert
              severity={detectionResult.urgencyLevel === 'High' ? 'error' : 
                        detectionResult.urgencyLevel === 'Medium' ? 'warning' : 'success'}
              icon={getUrgencyIcon(detectionResult.urgencyLevel)}
              sx={{ mb: 2 }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">
                  Urgency Level: {detectionResult.urgencyLevel}
                </Typography>
                <Chip
                  label={`${Math.round(detectionResult.confidence * 100)}% confidence`}
                  size="small"
                  color="primary"
                />
              </Box>
            </Alert>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography color="textSecondary" variant="caption" gutterBottom>
                    Animal Type
                  </Typography>
                  <Typography variant="h6">{detectionResult.animalType}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {detectionResult.breed}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography color="textSecondary" variant="caption" gutterBottom>
                    Condition
                  </Typography>
                  <Chip
                    label={detectionResult.condition}
                    color={getConditionColor(detectionResult.condition)}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography color="textSecondary" variant="caption" gutterBottom>
                    Estimated Age
                  </Typography>
                  <Typography variant="body2">{detectionResult.estimatedAge}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography color="textSecondary" variant="caption" gutterBottom>
                    Weight
                  </Typography>
                  <Typography variant="body2">{detectionResult.estimatedWeight} kg</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography color="textSecondary" variant="caption" gutterBottom>
                    Behavior
                  </Typography>
                  <Typography variant="body2">{detectionResult.behavior}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography color="textSecondary" variant="caption" gutterBottom>
                    Detected Issues
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    {detectionResult.injuries.map((injury, index) => (
                      <Chip
                        key={index}
                        label={injury}
                        color={injury.includes('No visible') ? 'success' : 'error'}
                        size="small"
                        icon={injury.includes('No visible') ? <CheckCircleIcon /> : <WarningIcon />}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HealingIcon /> Recommendations
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2 }}>
                    {detectionResult.recommendations.map((rec, index) => (
                      <Typography component="li" variant="body2" key={index}>
                        {rec}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography color="textSecondary" align="center" py={3}>
            Upload an image to start analysis
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalDetection;