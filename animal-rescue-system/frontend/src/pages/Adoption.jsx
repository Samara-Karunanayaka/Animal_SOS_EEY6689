import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Rating,
  IconButton,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Slide,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Search as SearchIcon,
  Pets as PetsIcon,
  LocationOn as LocationIcon,
  Female as FemaleIcon,
  Male as MaleIcon,
} from '@mui/icons-material';
import { cardStyles } from '../utils/cardStyles';
import { useNotification } from '../contexts/NotificationContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Adoption = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const { addNotification } = useNotification();

  const animals = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Labrador Retriever',
      age: '2 years',
      location: 'Diyatha Uyana Animal Sanctuary',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
      status: 'Available',
      health: 'Vaccinated, Neutered',
      gender: 'Male',
      personality: ['Friendly', 'Energetic', 'Good with kids'],
      story: 'Max was found abandoned but has proven to be the most loving and loyal companion.',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Persian Mix',
      age: '1 year',
      location: 'City Center Rescue Hub',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      status: 'Available',
      health: 'Vaccinated, Spayed',
      gender: 'Female',
      personality: ['Calm', 'Affectionate', 'Indoor'],
      story: 'Luna was rescued from a hoarding situation and is now ready for a loving home.',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'Dog',
      breed: 'Beagle',
      age: '3 years',
      location: 'Gal Oya Animal Care Center',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
      status: 'Pending',
      health: 'Vaccinated, Neutered',
      gender: 'Male',
      personality: ['Curious', 'Playful', 'Good with dogs'],
      story: 'Charlie loves to explore and would be perfect for an active family.',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Bella',
      type: 'Cat',
      breed: 'Siamese',
      age: '6 months',
      location: 'Northern District Shelter',
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
      status: 'Available',
      health: 'Vaccinated, Spayed',
      gender: 'Female',
      personality: ['Playful', 'Vocal', 'Social'],
      story: 'Bella is a young kitten full of energy and love to give.',
      rating: 5.0,
    },
    {
      id: 5,
      name: 'Rocky',
      type: 'Dog',
      breed: 'German Shepherd',
      age: '4 years',
      location: 'Western Region Rescue Center',
      image: 'https://images.unsplash.com/photo-1553882809-a4f57e59501d?w=400',
      status: 'Available',
      health: 'Vaccinated, Neutered, Trained',
      gender: 'Male',
      personality: ['Protective', 'Loyal', 'Intelligent'],
      story: 'Rocky is a trained guard dog looking for a family to protect.',
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Milo',
      type: 'Rabbit',
      breed: 'Holland Lop',
      age: '1 year',
      location: 'Kuda Pattun Surakum',
      image: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400',
      status: 'Available',
      health: 'Vaccinated, Neutered',
      gender: 'Male',
      personality: ['Gentle', 'Quiet', 'Good with children'],
      story: 'Milo is a sweet rabbit who loves gentle pets and fresh vegetables.',
      rating: 4.8,
    },
  ];

  const filteredAnimals = animals
    .filter(a => filter === 'all' ? true : a.type.toLowerCase() === filter)
    .filter(a =>
      searchTerm === '' ? true :
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAdoptClick = (animal) => {
    setSelectedAnimal(animal);
    setDialogOpen(true);
  };

  const handleAdoptConfirm = () => {
    addNotification({
      type: 'success',
      title: 'Adoption Request Sent!',
      message: `Thank you for your interest in adopting ${selectedAnimal.name}. The shelter will contact you within 24 hours.`,
    });
    setDialogOpen(false);
  };

  const toggleFavorite = (animalId) => {
    if (favorites.includes(animalId)) {
      setFavorites(favorites.filter(id => id !== animalId));
      addNotification({
        type: 'info',
        title: 'Removed from Favorites',
        message: 'Animal removed from your favorites list',
      });
    } else {
      setFavorites([...favorites, animalId]);
      addNotification({
        type: 'success',
        title: 'Added to Favorites',
        message: 'Animal added to your favorites list',
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <FavoriteIcon /> Find Your New Best Friend
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Every animal deserves a loving home. Browse our available animals and start your adoption journey today.
        </Typography>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Search by name, breed, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Animal Type</InputLabel>
              <Select
                value={filter}
                label="Animal Type"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Animals</MenuItem>
                <MenuItem value="dog">Dogs</MenuItem>
                <MenuItem value="cat">Cats</MenuItem>
                <MenuItem value="rabbit">Rabbits</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" gap={1} justifyContent="flex-end">
              <Chip
                icon={<FavoriteIcon />}
                label={`${favorites.length} Favorites`}
                variant="outlined"
              />
              <Chip
                icon={<PetsIcon />}
                label={`${filteredAnimals.length} Available`}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Animals Grid */}
      <Grid container spacing={3}>
        {filteredAnimals.map((animal) => (
          <Grid item xs={12} sm={6} md={4} key={animal.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Favorite Button */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    bgcolor: 'white',
                  },
                  zIndex: 1,
                }}
                onClick={() => toggleFavorite(animal.id)}
              >
                {favorites.includes(animal.id) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>

              {/* Image */}
              <CardMedia
                component="img"
                height="200"
                image={animal.image}
                alt={animal.name}
                sx={{ objectFit: 'cover' }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Name and Rating */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {animal.name}
                  </Typography>
                  <Rating value={animal.rating} size="small" readOnly />
                </Box>

                {/* Details */}
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  {animal.gender === 'Male' ? (
                    <MaleIcon color="primary" fontSize="small" />
                  ) : (
                    <FemaleIcon color="error" fontSize="small" />
                  )}
                  <Typography variant="body2" color="textSecondary">
                    {animal.breed} • {animal.age}
                  </Typography>
                </Box>

                {/* Location */}
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <LocationIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="textSecondary">
                    {animal.location}
                  </Typography>
                </Box>

                {/* Personality Traits */}
                <Box display="flex" gap={0.5} flexWrap="wrap" mb={2}>
                  {animal.personality.map((trait, index) => (
                    <Chip
                      key={index}
                      label={trait}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>

                {/* Story Preview */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 2,
                  }}
                >
                  {animal.story}
                </Typography>

                {/* Health Status */}
                <Chip
                  label={animal.health}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                {/* Action Buttons */}
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={animal.status !== 'Available'}
                    onClick={() => handleAdoptClick(animal)}
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    {animal.status === 'Available' ? 'Adopt Me' : 'Already Adopted'}
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Learn More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredAnimals.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No animals found
          </Typography>
          <Typography color="textSecondary">
            Try adjusting your search or check back later for new arrivals
          </Typography>
        </Paper>
      )}

      {/* Adoption Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
      >
        {selectedAnimal && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={selectedAnimal.image}
                  sx={{ width: 60, height: 60 }}
                />
                <Box>
                  <Typography variant="h6">Adopt {selectedAnimal.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedAnimal.breed} • {selectedAnimal.age}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Adoption Request
              </Typography>
              <Typography paragraph>
                Thank you for your interest in adopting {selectedAnimal.name}! 
                Please review the following information:
              </Typography>

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  📋 Requirements
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>Be at least 21 years old</li>
                  <li>Provide a safe and loving home</li>
                  <li>Have proper identification</li>
                  <li>Pay adoption fee of $150</li>
                </ul>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  🏥 Health Information
                </Typography>
                <Typography variant="body2">
                  {selectedAnimal.health}
                </Typography>
              </Paper>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                The shelter will contact you within 24 hours to discuss the adoption process and schedule a meet-and-greet.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handleAdoptConfirm}
                variant="contained"
                sx={{ bgcolor: 'primary.main' }}
              >
                Send Adoption Request
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Adoption;