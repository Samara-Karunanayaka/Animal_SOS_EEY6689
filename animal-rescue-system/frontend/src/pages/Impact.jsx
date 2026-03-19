import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  LinearProgress,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import {
  Pets as PetsIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerIcon,
  Payment as PaymentIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

const Impact = () => {
  const stats = {
    animalsRescued: 1250,
    animalsAdopted: 892,
    activeVolunteers: 350,
    totalDonations: 45250,
    citiesCovered: 15,
    yearsActive: 5,
  };

  const monthlyData = [
    { month: 'Jan', rescues: 85, adoptions: 62 },
    { month: 'Feb', rescues: 92, adoptions: 71 },
    { month: 'Mar', rescues: 98, adoptions: 75 },
    { month: 'Apr', rescues: 105, adoptions: 82 },
    { month: 'May', rescues: 112, adoptions: 88 },
    { month: 'Jun', rescues: 118, adoptions: 93 },
  ];

  const achievements = [
    { year: 2024, achievement: 'Opened 3 new shelters' },
    { year: 2023, achievement: 'Reached 1000 animals rescued' },
    { year: 2022, achievement: 'Launched mobile rescue units' },
    { year: 2021, achievement: 'Started volunteer training program' },
    { year: 2020, achievement: 'First 500 animals saved' },
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
          Our Impact
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Together, we're making a real difference in the lives of animals
        </Typography>
      </Box>

      {/* Main Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#FF6B6B', margin: '0 auto 16px' }}>
              <PetsIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#FF6B6B' }}>
              {stats.animalsRescued}
            </Typography>
            <Typography variant="h6">Animals Rescued</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              From streets to safety
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#4ECDC4', margin: '0 auto 16px' }}>
              <FavoriteIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#4ECDC4' }}>
              {stats.animalsAdopted}
            </Typography>
            <Typography variant="h6">Successful Adoptions</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Found forever homes
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#95E1D3', margin: '0 auto 16px' }}>
              <VolunteerIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#95E1D3' }}>
              {stats.activeVolunteers}
            </Typography>
            <Typography variant="h6">Active Volunteers</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Dedicated to the cause
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Monthly Progress */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              2024 Monthly Progress
            </Typography>
            <Box sx={{ mt: 3 }}>
              {monthlyData.map((data) => (
                <Box key={data.month} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{data.month}</Typography>
                    <Box>
                      <Chip
                        size="small"
                        label={`${data.rescues} rescued`}
                        sx={{ bgcolor: '#FF6B6B', color: 'white', mr: 1 }}
                      />
                      <Chip
                        size="small"
                        label={`${data.adoptions} adopted`}
                        sx={{ bgcolor: '#4ECDC4', color: 'white' }}
                      />
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(data.rescues / 150) * 100}
                    sx={{ height: 8, borderRadius: 4, bgcolor: '#FFE5E5' }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Impact Stats */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Financial Impact
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography>Total Donations</Typography>
              <Typography variant="h6" sx={{ color: '#FF6B6B' }}>
                ${stats.totalDonations.toLocaleString()}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography>Average Donation</Typography>
              <Typography variant="h6" sx={{ color: '#4ECDC4' }}>
                $45
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Donors</Typography>
              <Typography variant="h6" sx={{ color: '#95E1D3' }}>
                1,250+
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Coverage
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <LocationIcon sx={{ color: '#FF6B6B' }} />
              <Typography>{stats.citiesCovered} Cities</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <CalendarIcon sx={{ color: '#4ECDC4' }} />
              <Typography>{stats.yearsActive} Years of Service</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Timeline */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Our Journey
            </Typography>
            <Grid container spacing={2}>
              {achievements.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ color: '#FF6B6B' }}>
                      {item.year}
                    </Typography>
                    <Typography>{item.achievement}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Impact;