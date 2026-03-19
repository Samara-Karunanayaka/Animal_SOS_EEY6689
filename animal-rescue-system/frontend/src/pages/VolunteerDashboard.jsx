import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Box,
  LinearProgress,
  Rating,
  Divider,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Timeline as TimelineIcon,
  EmojiEvents as EmojiEventsIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const VolunteerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setAssignedTasks([
        { 
          id: 1, 
          animal: 'Dog', 
          location: 'Diyatha Uyana Park', 
          priority: 'High', 
          distance: '0.5 miles',
          reporter: 'J.V.',
          time: '10 min ago',
          description: 'Injured dog needs immediate attention'
        },
        { 
          id: 2, 
          animal: 'Cat', 
          location: 'Colombo Downtown', 
          priority: 'Medium', 
          distance: '1.2 miles',
          reporter: 'S.M.',
          time: '25 min ago',
          description: 'Stray cat with kittens'
        },
        { 
          id: 3, 
          animal: 'Bird', 
          location: 'Galle Road Park', 
          priority: 'Low', 
          distance: '2.0 miles',
          reporter: 'M.P.',
          time: '1 hour ago',
          description: 'Bird with injured wing'
        },
      ]);

      setCompletedTasks([
        { id: 4, animal: 'Rabbit', location: 'North Park', date: '2024-03-10', rating: 5 },
        { id: 5, animal: 'Dog', location: 'East Side', date: '2024-03-09', rating: 4 },
        { id: 6, animal: 'Cat', location: 'West End', date: '2024-03-08', rating: 5 },
      ]);

      setStats({
        totalRescues: 45,
        monthlyRescues: 12,
        hoursVolunteered: 156,
        points: 890,
        rating: 4.8,
        rank: 3,
      });

      setLoading(false);
    }, 1000);
  }, []);

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
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              Volunteer Dashboard
            </Typography>
            <Typography variant="body1">
              You're making a difference! Keep up the great work.
            </Typography>
          </Grid>
          <Grid item>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: 'primary.main' }}>
              <EmojiEventsIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Rescues
                  </Typography>
                  <Typography variant="h4">{stats.totalRescues}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#667eea' }}>
                  <CheckCircleIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    This Month
                  </Typography>
                  <Typography variant="h4">{stats.monthlyRescues}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#f6b93b' }}>
                  <TimelineIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Hours
                  </Typography>
                  <Typography variant="h4">{stats.hoursVolunteered}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#78e08f' }}>
                  <TimeIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Points
                  </Typography>
                  <Typography variant="h4">{stats.points}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#fa983a' }}>
                  <EmojiEventsIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Assigned Tasks */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentIcon color="primary" />
              Assigned Tasks ({assignedTasks.length})
            </Typography>
            
            {assignedTasks.map((task) => (
              <Card key={task.id} sx={{ mb: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {task.animal}
                        </Typography>
                        <Chip 
                          label={task.priority}
                          color={task.priority === 'High' ? 'error' : 
                                 task.priority === 'Medium' ? 'warning' : 'success'}
                          size="small"
                        />
                      </Box>
                      
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body2">{task.location}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          ({task.distance})
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="textSecondary" paragraph>
                        {task.description}
                      </Typography>

                      <Typography variant="caption" color="textSecondary">
                        Reported by {task.reporter} • {task.time}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<LocationIcon />}
                        >
                          Navigate
                        </Button>
                        <Button 
                          variant="outlined" 
                          fullWidth
                        >
                          Update Status
                        </Button>
                        <Button 
                          variant="text" 
                          fullWidth
                          size="small"
                        >
                          View Details
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}

            {assignedTasks.length === 0 && (
              <Typography color="textSecondary" align="center" py={3}>
                No assigned tasks at the moment
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Performance Stats */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="body2">Volunteer Rating</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={stats.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2">{stats.rating}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body2">Overall Rank</Typography>
              <Chip label={`#${stats.rank}`} color="primary" size="small" />
            </Box>
          </Paper>

          {/* Completed Tasks */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recently Completed
            </Typography>
            <List>
              {completedTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={`${task.animal} at ${task.location}`}
                      secondary={task.date}
                    />
                    <Rating value={task.rating} size="small" readOnly />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VolunteerDashboard;