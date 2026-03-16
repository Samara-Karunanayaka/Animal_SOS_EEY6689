import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Divider,
  Rating,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  VolunteerActivism as VolunteerIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Badge as BadgeIcon,
  EmojiEvents as EmojiEventsIcon,
  Favorite as FavoriteIcon,
  Pets as PetsIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const VolunteerInfo = () => {
  const steps = [
    {
      label: 'Registration',
      description: 'Create your volunteer account with basic information and ID verification',
      icon: <AssignmentIcon />,
      details: [
        'Fill out online application form',
        'Upload valid government ID',
        'Provide emergency contact',
        'Agree to volunteer terms',
      ],
    },
    {
      label: 'Online Training',
      description: 'Complete our comprehensive training program on animal handling and safety',
      icon: <SchoolIcon />,
      details: [
        'Animal first aid certification',
        'Safe handling techniques',
        'Emergency response protocols',
        'Communication guidelines',
      ],
    },
    {
      label: 'Background Check',
      description: 'Pass a standard background check to ensure safety',
      icon: <SecurityIcon />,
      details: [
        'Criminal record check',
        'Reference verification',
        'Identity confirmation',
        'Driving record check (if applicable)',
      ],
    },
    {
      label: 'Start Volunteering',
      description: 'Begin receiving rescue assignments and making a difference',
      icon: <VolunteerIcon />,
      details: [
        'Receive rescue alerts',
        'Choose assignments',
        'Track your impact',
        'Earn badges and recognition',
      ],
    },
  ];

  const requirements = [
    'Age 18 years or older',
    'Valid government ID',
    'Reliable transportation',
    'Smartphone with GPS',
    'Basic first aid knowledge (training provided)',
    'Good physical condition',
    'Clean background check',
    'Commitment to animal welfare',
    'Flexible schedule',
    'Good communication skills',
  ];

  const benefits = [
    {
      title: 'Free Training',
      description: 'Professional training in animal rescue and first aid',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: '#FF6B6B',
    },
    {
      title: 'Recognition',
      description: 'Badges, certificates, and public recognition for your service',
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      color: '#4ECDC4',
    },
    {
      title: 'Community',
      description: 'Join a community of like-minded animal lovers',
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      color: '#95E1D3',
    },
    {
      title: 'Impact',
      description: 'Directly save lives and make a real difference',
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      color: '#FFE194',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Volunteer for 2 years',
      text: 'Being a volunteer has been the most rewarding experience. I\'ve helped save over 50 animals and made amazing friends.',
      rating: 5,
      rescues: 45,
      avatar: 'SJ',
    },
    {
      name: 'Mike Thompson',
      role: 'Volunteer for 3 years',
      text: 'The training was excellent, and the support from the team is incredible. Every rescue mission is worth it.',
      rating: 5,
      rescues: 78,
      avatar: 'MT',
    },
    {
      name: 'Emily Davis',
      role: 'Volunteer for 1 year',
      text: 'I joined to help animals, but I gained so much more - a purpose, community, and countless heartwarming moments.',
      rating: 5,
      rescues: 23,
      avatar: 'ED',
    },
  ];

  const faqs = [
    {
      question: 'How much time do I need to commit?',
      answer: 'There\'s no minimum time commitment. You can choose which rescue missions to accept based on your availability.',
    },
    {
      question: 'Do I need any prior experience?',
      answer: 'No prior experience is required. We provide all necessary training and support.',
    },
    {
      question: 'What equipment do I need?',
      answer: 'Basic equipment like gloves and first aid kit are provided. You\'ll need a smartphone with GPS and reliable transportation.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            bgcolor: '#FF6B6B',
            margin: '0 auto 16px',
          }}
        >
          <VolunteerIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{ 
            color: '#FF6B6B', 
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Become a Volunteer
        </Typography>
        <Typography 
          variant="h5" 
          color="textSecondary" 
          sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}
        >
          Join our team of dedicated volunteers and help save animals in need
        </Typography>
        
        {/* Status Chips */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip 
            icon={<CheckCircleIcon />} 
            label="200+ Active Volunteers" 
            sx={{ bgcolor: '#4ECDC4', color: 'white' }} 
          />
          <Chip 
            icon={<EmojiEventsIcon />} 
            label="15,000+ Hours Contributed" 
            sx={{ bgcolor: '#95E1D3', color: 'white' }} 
          />
          <Chip 
            icon={<FavoriteIcon />} 
            label="1,250+ Animals Saved" 
            sx={{ bgcolor: '#FFE194', color: 'white' }} 
          />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            textAlign: 'center', 
            p: 3,
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            }
          }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#FF6B6B', margin: '0 auto 16px' }}>
              <GroupIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" sx={{ color: '#FF6B6B', fontWeight: 700 }}>
              350+
            </Typography>
            <Typography variant="h6">Active Volunteers</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Growing every day
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            textAlign: 'center', 
            p: 3,
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            }
          }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#4ECDC4', margin: '0 auto 16px' }}>
              <ScheduleIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" sx={{ color: '#4ECDC4', fontWeight: 700 }}>
              15K+
            </Typography>
            <Typography variant="h6">Hours Contributed</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              This year alone
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            textAlign: 'center', 
            p: 3,
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            }
          }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#95E1D3', margin: '0 auto 16px' }}>
              <PetsIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" sx={{ color: '#95E1D3', fontWeight: 700 }}>
              1,250+
            </Typography>
            <Typography variant="h6">Animals Saved</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              And counting
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Left Column - Process */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#FF6B6B' }}>
              How to Become a Volunteer
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Follow these simple steps to start your journey as an animal rescue volunteer
            </Typography>
            
            <Stepper orientation="vertical" sx={{ mt: 4 }}>
              {steps.map((step, index) => (
                <Step key={index} active={true} completed={false}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Avatar sx={{ bgcolor: '#FF6B6B', width: 40, height: 40 }}>
                        {step.icon}
                      </Avatar>
                    )}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography color="textSecondary" paragraph>
                      {step.description}
                    </Typography>
                    <List dense>
                      {step.details.map((detail, idx) => (
                        <ListItem key={idx} sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircleIcon sx={{ color: '#4ECDC4', fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText primary={detail} />
                        </ListItem>
                      ))}
                    </List>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ 
                  bgcolor: '#FF6B6B', 
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: '#FF5252' }
                }}
              >
                Apply Now to Become a Volunteer
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Requirements and Benefits */}
        <Grid item xs={12} md={5}>
          {/* Requirements Card */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#4ECDC4' }}>
              Requirements
            </Typography>
            <List>
              {requirements.map((req, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: '#4ECDC4' }} />
                  </ListItemIcon>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Benefits Grid */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#95E1D3' }}>
              What You'll Gain
            </Typography>
            <Grid container spacing={2}>
              {benefits.map((benefit, index) => (
                <Grid item xs={6} key={index}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      height: '100%',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        borderColor: benefit.color,
                      }
                    }}
                  >
                    <Box sx={{ color: benefit.color, mb: 1 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {benefit.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Testimonials Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: '#FF6B6B' }}>
          What Our Volunteers Say
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                }
              }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: '#FF6B6B',
                        fontSize: '1.5rem'
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2 }} />
                  <Typography variant="body2" color="textSecondary" paragraph>
                    "{testimonial.text}"
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip 
                      icon={<PetsIcon />} 
                      label={`${testimonial.rescues} rescues`}
                      size="small"
                      sx={{ bgcolor: '#FFE194' }}
                    />
                    <Chip 
                      icon={<EmojiEventsIcon />} 
                      label="Top Volunteer"
                      size="small"
                      sx={{ bgcolor: '#4ECDC4', color: 'white' }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#FF6B6B' }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#4ECDC4' }}>
                  {faq.question}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {faq.answer}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* CTA Section */}
      <Paper 
        sx={{ 
          p: 6, 
          mt: 6, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
          color: 'white',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          Ready to Make a Difference?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Join our community of volunteers today and start saving lives
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'white',
            color: '#FF6B6B',
            py: 2,
            px: 6,
            fontSize: '1.2rem',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            },
          }}
        >
          Apply Now
        </Button>
      </Paper>
    </Container>
  );
};

export default VolunteerInfo;