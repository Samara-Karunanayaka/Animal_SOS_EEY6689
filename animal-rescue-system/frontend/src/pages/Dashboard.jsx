import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Pets as PetsIcon,
  Timeline as TimelineIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerIcon,
  EmojiEvents as EmojiEventsIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { cardStyles } from '../utils/cardStyles';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReports: 0,
    activeCases: 0,
    resolvedCases: 0,
    volunteers: 0,
  });

  const [recentCases, setRecentCases] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalReports: 156,
        activeCases: 23,
        resolvedCases: 133,
        volunteers: 45,
      });

      setRecentCases([
        { id: 1, animal: 'Dog', location: 'Diyatha Uyana Park', status: 'In Progress', priority: 'High', time: '10 min ago' },
        { id: 2, animal: 'Cat', location: 'Colombo Downtown', status: 'Assigned', priority: 'Medium', time: '25 min ago' },
        { id: 3, animal: 'Bird', location: 'Galle Road', status: 'Resolved', priority: 'Low', time: '1 hour ago' },
        { id: 4, animal: 'Rabbit', location: 'Colombo North', status: 'Reported', priority: 'High', time: '5 min ago' },
      ]);

      setNotifications([
        { id: 1, message: 'New case assigned to you', time: '2 min ago', read: false },
        { id: 2, message: 'Case #123 has been updated', time: '15 min ago', read: false },
        { id: 3, message: 'Thank you for your donation!', time: '1 hour ago', read: true },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'success';
      case 'In Progress': return 'info';
      case 'Assigned': return 'warning';
      case 'Reported': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container>
        <LinearProgress />
        <Typography align="center" sx={{ mt: 2 }}>Loading dashboard...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.name || 'User'}! 👋
            </Typography>
            <Typography variant="body1">
              You have {stats.activeCases} active cases nearby. Keep up the great work!
            </Typography>
          </Grid>
          <Grid item>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '2.5rem'
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Reports
                  </Typography>
                  <Typography variant="h4">{stats.totalReports}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#667eea' }}>
                  <PetsIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Active Cases
                  </Typography>
                  <Typography variant="h4">{stats.activeCases}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#f6b93b' }}>
                  <TimelineIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                8 need attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Resolved Cases
                  </Typography>
                  <Typography variant="h4">{stats.resolvedCases}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#78e08f' }}>
                  <FavoriteIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                +23 this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Volunteers
                  </Typography>
                  <Typography variant="h4">{stats.volunteers}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#fa983a' }}>
                  <VolunteerIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                15 available now
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Cases */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimelineIcon color="primary" />
              Recent Cases
            </Typography>
            <List>
              {recentCases.map((case_, index) => (
                <React.Fragment key={case_.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getPriorityColor(case_.priority) + '.main' }}>
                        <PetsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {case_.animal}
                          </Typography>
                          <Chip
                            label={case_.priority}
                            size="small"
                            color={getPriorityColor(case_.priority)}
                          />
                          <Chip
                            label={case_.status}
                            size="small"
                            color={getStatusColor(case_.status)}
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textSecondary">
                            {case_.location}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption" color="textSecondary">
                            {case_.time}
                          </Typography>
                        </>
                      }
                    />
                    <Button size="small" variant="outlined">View</Button>
                  </ListItem>
                  {index < recentCases.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Box textAlign="center" mt={2}>
              <Button color="primary">View All Cases</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Notifications & Leaderboard */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsIcon color="primary" />
              Recent Notifications
            </Typography>
            <List>
              {notifications.map((notif) => (
                <ListItem key={notif.id} sx={{ px: 0, opacity: notif.read ? 0.7 : 1 }}>
                  <ListItemText
                    primary={notif.message}
                    secondary={notif.time}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: { fontWeight: notif.read ? 400 : 600 }
                    }}
                  />
                  {!notif.read && (
                    <Chip label="New" size="small" color="primary" sx={{ ml: 1 }} />
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiEventsIcon color="primary" />
              Top Volunteers
            </Typography>
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#FFD700' }}>1</Avatar>
                </ListItemAvatar>
                <ListItemText primary="John Silva" secondary="45 rescues this month" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#C0C0C0' }}>2</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Jane Fernando" secondary="38 rescues this month" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#CD7F32' }}>3</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Michael Jayasekera" secondary="32 rescues this month" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;