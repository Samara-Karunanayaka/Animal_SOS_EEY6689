import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Box,
  Rating,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: 'Max',
      type: 'Golden Retriever',
      age: '3 years',
      story: 'Found injured on the highway, Max was rushed to our partner vet. After surgery and rehabilitation, he found his forever home with a loving family.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      adopter: 'The Johnson Family',
      date: 'March 2024',
      rating: 5,
      location: 'New York, NY',
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Siamese Cat',
      age: '2 years',
      story: 'Luna was found with her kittens in an abandoned building. All her kittens found homes, and Luna now lives happily with a retired couple.',
      image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&h=400&fit=crop',
      adopter: 'The Smiths',
      date: 'February 2024',
      rating: 5,
      location: 'Los Angeles, CA',
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'Beagle',
      age: '4 years',
      story: 'Charlie was used in a laboratory and needed special care. After months of rehabilitation, he became a therapy dog helping children with autism.',
      image: 'https://images.unsplash.com/photo-1505628346881-ee5c9a6ea847?w=600&h=400&fit=crop',
      adopter: 'Children\'s Therapy Center',
      date: 'January 2024',
      rating: 5,
      location: 'Chicago, IL',
    },
    {
      id: 4,
      name: 'Bella',
      type: 'Rabbit',
      age: '1 year',
      story: 'Abandoned in a park, Bella was scared and malnourished. Now she\'s healthy and loved by a family with young children.',
      image: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&h=400&fit=crop',
      adopter: 'The Wilsons',
      date: 'March 2024',
      rating: 5,
      location: 'Miami, FL',
    },
    {
      id: 5,
      name: 'Rocky',
      type: 'German Shepherd',
      age: '5 years',
      story: 'Rocky was found as a stray, malnourished and scared. After rehabilitation, he became a police K-9 unit member.',
      image: 'https://images.unsplash.com/photo-1553882809-a4f57e59501d?w=600&h=400&fit=crop',
      adopter: 'Police Department',
      date: 'December 2023',
      rating: 5,
      location: 'Houston, TX',
    },
    {
      id: 6,
      name: 'Milo',
      type: 'Parrot',
      age: '2 years',
      story: 'Milo was found with clipped wings and couldn\'t fly. After care and rehabilitation, he was adopted by an avian sanctuary.',
      image: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=600&h=400&fit=crop',
      adopter: 'Avian Sanctuary',
      date: 'February 2024',
      rating: 5,
      location: 'Phoenix, AZ',
    },
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
          Success Stories
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Every happy tail tells a story of hope, love, and second chances
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: '#FF6B6B', margin: '0 auto 16px' }}>
              <FavoriteIcon />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF6B6B' }}>
              1,250+
            </Typography>
            <Typography>Lives Saved</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: '#4ECDC4', margin: '0 auto 16px' }}>
              <CalendarIcon />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#4ECDC4' }}>
              5 Years
            </Typography>
            <Typography>Of Service</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: '#95E1D3', margin: '0 auto 16px' }}>
              <LocationIcon />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#95E1D3' }}>
              15+
            </Typography>
            <Typography>Cities</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Stories Grid */}
      <Grid container spacing={4}>
        {stories.map((story) => (
          <Grid item xs={12} md={6} lg={4} key={story.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="240"
                image={story.image}
                alt={story.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {story.name}
                  </Typography>
                  <Chip label={story.type} size="small" sx={{ bgcolor: '#FF6B6B', color: 'white' }} />
                </Box>
                
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {story.age} • {story.location}
                </Typography>
                
                <Typography variant="body2" paragraph sx={{ mt: 2, minHeight: 80 }}>
                  {story.story}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Adopted by
                    </Typography>
                    <Typography variant="subtitle2">{story.adopter}</Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="caption" color="textSecondary">
                      {story.date}
                    </Typography>
                    <Rating value={story.rating} size="small" readOnly />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SuccessStories;