import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Rating,
  Chip,
  Divider,
  TextField,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Pets as PetsIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerActivismIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  EmojiEvents as EmojiEventsIcon,
  Healing as HealingIcon,
  FlightTakeoff as FlightTakeoffIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { cardStyles } from '../utils/cardStyles';

const LandingPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { value: 0, target: 1250, label: 'Animals Rescued', icon: <PetsIcon />, color: '#FF6B6B' },
    { value: 0, target: 350, label: 'Active Volunteers', icon: <VolunteerActivismIcon />, color: '#4ECDC4' },
    { value: 0, target: 892, label: 'Successful Adoptions', icon: <FavoriteIcon />, color: '#95E1D3' },
    { value: 0, target: 24, label: 'Partner NGOs', icon: <GroupIcon />, color: '#FFE194' },
  ]);

  // Animate stats on load
  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setStats(prevStats => {
          const newStats = [...prevStats];
          if (newStats[index].value < newStats[index].target) {
            newStats[index].value = Math.min(
              newStats[index].value + Math.ceil(newStats[index].target / 50),
              newStats[index].target
            );
          }
          return newStats;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const features = [
    {
      title: 'Quick Emergency Reporting',
      description: 'Report injured or stray animals in seconds with photo, location, and voice description',
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      color: '#FF6B6B',
      benefits: ['Photo upload with AI detection', 'Voice description analysis', 'Automatic location detection'],
    },
    {
      title: 'Real-Time Tracking',
      description: 'Track rescue progress live with GPS location and status updates',
      icon: <FlightTakeoffIcon sx={{ fontSize: 48 }} />,
      color: '#4ECDC4',
      benefits: ['Live map tracking', 'Status notifications', 'Volunteer ETA'],
    },
    {
      title: 'Secure & Verified',
      description: 'All volunteers and NGOs are verified for your safety',
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      color: '#95E1D3',
      benefits: ['Background verified', 'ID checked', 'Reviews & ratings'],
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance for emergencies',
      icon: <SupportIcon sx={{ fontSize: 48 }} />,
      color: '#FFE194',
      benefits: ['Chatbot assistance', 'Emergency hotline', 'Quick response'],
    },
  ];

  const successStories = [
    {
      id: 1,
      name: 'Max',
      type: 'Golden Retriever',
      age: '3 years',
      story: 'Found injured on the highway, Max was rushed to our partner vet. After surgery and rehabilitation, he found his forever home with a loving family.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      adopter: 'The Johnson Family',
      rating: 5,
      date: 'March 2024',
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Siamese Cat',
      age: '2 years',
      story: 'Luna was found with her kittens in an abandoned building. All her kittens found homes, and Luna now lives happily with a retired couple.',
      image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&h=400&fit=crop',
      adopter: 'The Smiths',
      rating: 5,
      date: 'February 2024',
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'Beagle',
      age: '4 years',
      story: 'Charlie was used in a laboratory and needed special care. After months of rehabilitation, he became a therapy dog helping children with autism.',
      image: 'https://images.unsplash.com/photo-1505628346881-ee5c9a6ea847?w=600&h=400&fit=crop',
      adopter: 'Children\'s Therapy Center',
      rating: 5,
      date: 'January 2024',
    },
    {
      id: 4,
      name: 'Bella',
      type: 'Rabbit',
      age: '1 year',
      story: 'Abandoned in a park, Bella was scared and malnourished. Now she\'s healthy and loved by a family with young children.',
      image: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&h=400&fit=crop',
      adopter: 'The Silva Family',
      rating: 5,
      date: 'March 2024',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Jayasinghe',
      role: 'Adopter',
      text: 'I found my best friend through this platform. The process was smooth and the team was incredibly supportive throughout.',
      avatar: 'SJ',
      rating: 5,
    },
    {
      id: 2,
      name: 'Dr. Michael Perera',
      role: 'Veterinarian',
      text: 'As a vet, I\'ve seen how this system saves lives. The quick response time and coordination with volunteers is impressive.',
      avatar: 'MP',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Wijeratne',
      role: 'Volunteer',
      text: 'Volunteering here has been life-changing. The platform makes it easy to find and help animals in need.',
      avatar: 'ER',
      rating: 5,
    },
  ];

  const partners = [
    { name: 'SPA', logo: '🏥' },
    { name: 'Humane Society Sri Lanka', logo: '🐾' },
    { name: 'PETA Asia', logo: '🌱' },
    { name: 'Best Friends Animal Society', logo: '❤️' },
    { name: 'Animal Health Services', logo: '🏪' },
    { name: 'Veterinary Care Lanka', logo: '⚕️' },
  ];

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      {/* Hero Section with Parallax Effect */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box>
                <Chip
                  label="🐾 Animal Rescue Network"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    mb: 3,
                    backdropFilter: 'blur(10px)',
                    fontSize: '1rem',
                    py: 2,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    fontWeight: 800,
                    color: 'white',
                    mb: 2,
                    lineHeight: 1.2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Every Life
                  <Box component="span" sx={{ color: '#FF6B6B', display: 'block' }}>
                    Matters
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 4,
                    maxWidth: 600,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  Join our community of animal lovers. Together, we can rescue, rehabilitate, and rehome animals in need.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/report')}
                    sx={{
                      bgcolor: '#FF6B6B',
                      color: 'white',
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: '#FF5252',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    🚨 Report Emergency
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/adoption')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    🏠 Find a Friend
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    onClick={() => handleScrollToSection('how-it-works')}
                    sx={{
                      color: 'white',
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>

                {/* Trust Badges */}
                <Box sx={{ display: 'flex', gap: 3, mt: 6, color: 'white', flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#4ECDC4' }} />
                    <Typography variant="body2">Verified NGOs</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#4ECDC4' }} />
                    <Typography variant="body2">24/7 Support</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#4ECDC4' }} />
                    <Typography variant="body2">5000+ Success</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 200, md: 400 },
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {/* Animated floating elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    animation: 'float 3s ease-in-out infinite',
                  }}
                >
                  <Avatar sx={{ width: 80, height: 80, bgcolor: '#FF6B6B' }}>
                    <PetsIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '30%',
                    left: '10%',
                    animation: 'float 4s ease-in-out infinite',
                  }}
                >
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#4ECDC4' }}>
                    <FavoriteIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '30%',
                    animation: 'float 5s ease-in-out infinite',
                  }}
                >
                  <Avatar sx={{ width: 70, height: 70, bgcolor: '#95E1D3' }}>
                    <VolunteerActivismIcon sx={{ fontSize: 35 }} />
                  </Avatar>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section with Counter Animation */}
      <Container maxWidth="lg" sx={{ py: 8, mt: -5, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'white',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: stat.color,
                    width: 70,
                    height: 70,
                    margin: '0 auto 16px',
                    boxShadow: `0 10px 20px ${stat.color}40`,
                  }}
                >
                  {React.cloneElement(stat.icon, { sx: { fontSize: 35 } })}
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value.toLocaleString()}+
                </Typography>
                <Typography color="text.secondary" variant="h6">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: '#F8F9FA', py: 8 }} id="how-it-works">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Three simple steps to save a life
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                step: '01',
                title: 'Report',
                description: 'Report injured or stray animals with photos, location, and description',
                icon: <PetsIcon />,
                color: '#FF6B6B',
              },
              {
                step: '02',
                title: 'Rescue',
                description: 'Our verified volunteers and NGOs respond immediately to rescue the animal',
                icon: <VolunteerActivismIcon />,
                color: '#4ECDC4',
              },
              {
                step: '03',
                title: 'Rehabilitate',
                description: 'Animals receive medical care and find loving forever homes',
                icon: <FavoriteIcon />,
                color: '#95E1D3',
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      '& .step-number': {
                        transform: 'scale(1.1)',
                        bgcolor: item.color,
                        color: 'white',
                      },
                    },
                  }}
                >
                  <Box
                    className="step-number"
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: 20,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      border: `3px solid ${item.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: item.color,
                      transition: 'all 0.3s',
                      zIndex: 1,
                    }}
                  >
                    {item.step}
                  </Box>
                  <CardContent sx={{ pt: 6 }}>
                    <Avatar
                      sx={{
                        bgcolor: `${item.color}20`,
                        color: item.color,
                        width: 80,
                        height: 80,
                        mb: 2,
                      }}
                    >
                      {React.cloneElement(item.icon, { sx: { fontSize: 40 } })}
                    </Avatar>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 2,
          }}
        >
          Why Choose Us?
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
        >
          We provide the most comprehensive animal rescue platform
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: feature.color,
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: `${feature.color}20`,
                      color: feature.color,
                      width: 80,
                      height: 80,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  {feature.benefits.map((benefit, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1,
                        color: 'text.secondary',
                      }}
                    >
                      <CheckCircleIcon sx={{ color: feature.color, fontSize: 20 }} />
                      <Typography>{benefit}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Success Stories Carousel */}
      <Box sx={{ bgcolor: '#F8F9FA', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Success Stories
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Every animal deserves a happy ending
          </Typography>

          <Grid container spacing={4}>
            {successStories.map((story, index) => (
              <Grid item xs={12} sm={6} md={3} key={story.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      '& .story-image': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                    <CardMedia
                      component="img"
                      image={story.image}
                      alt={story.name}
                      className="story-image"
                      sx={{
                        height: 200,
                        transition: 'transform 0.5s',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        borderRadius: 2,
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {story.date}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {story.name}
                      </Typography>
                      <Chip label={story.type} size="small" sx={{ bgcolor: '#FF6B6B', color: 'white' }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {story.age}
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ minHeight: 80 }}>
                      {story.story}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Adopted by: {story.adopter}
                      </Typography>
                      <Rating value={story.rating} size="small" readOnly />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/adoption')}
              sx={{
                borderColor: '#FF6B6B',
                color: '#FF6B6B',
                '&:hover': {
                  borderColor: '#FF5252',
                  bgcolor: 'rgba(255,107,107,0.1)',
                },
              }}
            >
              View More Stories
              <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 2,
          }}
        >
          What People Say
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
        >
          Hear from our community of animal lovers
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  position: 'relative',
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
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#FF6B6B' }}>
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Partners Section */}
      <Box sx={{ bgcolor: '#F8F9FA', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 600 }}
          >
            Trusted Partners
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Working together to make a difference
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {partners.map((partner, index) => (
              <Grid item key={index}>
                <Paper
                  sx={{
                    p: 3,
                    minWidth: 120,
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {partner.logo}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {partner.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section with Parallax */}
      <Box
        sx={{
          position: 'relative',
          py: 12,
          backgroundImage: 'url(https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=1920&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.6)',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Ready to Make a Difference?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
              }}
            >
              Join thousands of animal lovers who are already helping animals in need.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/report')}
                sx={{
                  bgcolor: '#FF6B6B',
                  color: 'white',
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  '&:hover': {
                    bgcolor: '#FF5252',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Report an Animal
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/volunteer')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Become a Volunteer
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 4,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Stay Updated
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Subscribe to our newsletter for rescue stories and updates
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                bgcolor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#FF6B6B',
                color: 'white',
                px: 4,
                '&:hover': {
                  bgcolor: '#FF5252',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </Box>
  );
};

export default LandingPage;