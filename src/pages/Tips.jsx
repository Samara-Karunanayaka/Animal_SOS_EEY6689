import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Pets as PetsIcon,
  Favorite as FavoriteIcon,
  Warning as WarningIcon,
  LocalHospital as HospitalIcon,
  Restaurant as FoodIcon,
  Home as HomeIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const Tips = () => {
  const tips = [
    {
      category: 'Emergency',
      title: 'What to do when you find an injured animal',
      content: 'Stay calm, assess the situation from a safe distance. Call for professional help immediately. Do not attempt to move the animal if you\'re not trained.',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&h=400&fit=crop',
      icon: <WarningIcon />,
      color: '#FF6B6B',
    },
    {
      category: 'First Aid',
      title: 'Basic animal first aid tips',
      content: 'Keep a first aid kit ready. Learn to recognize signs of distress. Never give human medication to animals. Keep emergency contacts handy.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop',
      icon: <HospitalIcon />,
      color: '#4ECDC4',
    },
    {
      category: 'Nutrition',
      title: 'Proper nutrition for rescued animals',
      content: 'Provide fresh water at all times. Feed age-appropriate food. Avoid giving table scraps. Consult a vet for special dietary needs.',
      image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&h=400&fit=crop',
      icon: <FoodIcon />,
      color: '#95E1D3',
    },
    {
      category: 'Shelter',
      title: 'Creating a safe temporary shelter',
      content: 'Provide a quiet, warm space. Use soft bedding. Keep away from loud noises. Ensure the area is escape-proof and safe.',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
      icon: <HomeIcon />,
      color: '#FFE194',
    },
    {
      category: 'Transport',
      title: 'Safe transportation of injured animals',
      content: 'Use a secure carrier or box. Keep the animal calm and warm. Drive slowly and avoid sudden stops. Get to the vet immediately.',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
      icon: <PetsIcon />,
      color: '#FF6B6B',
    },
    {
      category: 'Recovery',
      title: 'Post-rescue care tips',
      content: 'Follow vet instructions carefully. Provide a quiet recovery space. Monitor food and water intake. Give medications as prescribed.',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
      icon: <FavoriteIcon />,
      color: '#4ECDC4',
    },
  ];

  const emergencyTips = [
    'Stay calm and assess the situation',
    'Call emergency services immediately',
    'Do not put yourself in danger',
    'Keep children and pets away',
    'Do not feed or give water',
    'Take photos for documentation',
    'Note the exact location',
    'Wait for professional help',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: '#FF6B6B', fontWeight: 700 }}
        >
          Animal Rescue Tips
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Essential information to help you assist animals in need
        </Typography>
      </Box>

      {/* Emergency Tips Banner */}
      <Paper
        sx={{
          p: 4,
          mb: 6,
          bgcolor: '#FF6B6B',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <WarningIcon sx={{ fontSize: 60 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Emergency Tips
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={1}>
              {emergencyTips.map((tip, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <InfoIcon fontSize="small" />
                    <Typography variant="body2">{tip}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Tips Grid */}
      <Grid container spacing={4}>
        {tips.map((tip, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={tip.image}
                alt={tip.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Avatar sx={{ bgcolor: tip.color }}>
                    {tip.icon}
                  </Avatar>
                  <Chip
                    label={tip.category}
                    size="small"
                    sx={{ bgcolor: tip.color, color: 'white' }}
                  />
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {tip.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {tip.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Resources */}
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#FF6B6B' }}>
          Additional Resources
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: '#FF6B6B' }}>
                  <HospitalIcon />
                </Avatar>
                <Typography variant="h6">Vet Directory</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Find emergency veterinary clinics near you
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: '#4ECDC4' }}>
                  <PetsIcon />
                </Avatar>
                <Typography variant="h6">Training Videos</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Watch tutorials on animal first aid and rescue
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: '#95E1D3' }}>
                  <FavoriteIcon />
                </Avatar>
                <Typography variant="h6">Download Guide</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Get our complete animal rescue handbook (PDF)
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Tips;