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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Pets as PetsIcon,
  VolunteerActivism as VolunteerIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { cardStyles } from '../utils/cardStyles';

const NGODashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeVolunteers, setActiveVolunteers] = useState([]);
  const [rescuedAnimals, setRescuedAnimals] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setPendingRequests([
        {
          id: 1, 
          animal: 'Dog', 
          location: 'Diyatha Uyana Park', 
          priority: 'High', 
          reporter: 'J.V.',
          time: '10 min ago',
          status: 'Pending'
        },
        { 
          id: 2, 
          animal: 'Cat', 
          location: 'Colombo Downtown', 
          priority: 'Medium', 
          reporter: 'S.M.',
          time: '25 min ago',
          status: 'Pending'
        },
        { 
          id: 3, 
          animal: 'Bird', 
          location: 'Galle Road', 
          priority: 'Low', 
          reporter: 'M.P.',
          time: '1 hour ago',
          status: 'Assigned'
        },
      ]);

      setActiveVolunteers([
        { id: 1, name: 'Michael Jayasekera', tasks: 3, status: 'Available', rating: 4.8 },
        { id: 2, name: 'Emily Wijeratne', tasks: 2, status: 'Busy', rating: 4.9 },
        { id: 3, name: 'David Gunasekara', tasks: 1, status: 'Available', rating: 4.7 },
        { id: 4, name: 'Lisa Bandara', tasks: 4, status: 'Busy', rating: 4.8 },
      ]);

      setRescuedAnimals([
        { id: 1, name: 'Max', type: 'Dog', status: 'Recovering', health: 'Good', daysInCare: 5 },
        { id: 2, name: 'Luna', type: 'Cat', status: 'Ready for adoption', health: 'Excellent', daysInCare: 12 },
        { id: 3, name: 'Charlie', type: 'Dog', status: 'Medical treatment', health: 'Fair', daysInCare: 3 },
        { id: 4, name: 'Bella', type: 'Cat', status: 'Ready for adoption', health: 'Good', daysInCare: 8 },
      ]);

      setStats({
        totalRescues: 156,
        monthlyRescues: 24,
        activeCases: 18,
        volunteers: 12,
        adoptions: 89,
        donations: 12500,
      });

      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'secondary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          NGO Dashboard
        </Typography>
        <Typography variant="body1">
          Manage rescue operations, volunteers, and rescued animals
        </Typography>
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
                  <PetsIcon />
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
                    Active Cases
                  </Typography>
                  <Typography variant="h4">{stats.activeCases}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#f6b93b' }}>
                  <WarningIcon />
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
                    Volunteers
                  </Typography>
                  <Typography variant="h4">{stats.volunteers}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#78e08f' }}>
                  <VolunteerIcon />
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
                    Donations
                  </Typography>
                  <Typography variant="h4">${stats.donations}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#fa983a' }}>
                  <CheckCircleIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Pending Requests" />
          <Tab label="Volunteers" />
          <Tab label="Rescued Animals" />
        </Tabs>
      </Paper>

      {/* Pending Requests Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Rescue Requests
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Animal</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Reporter</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.animal}</TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>
                          <Chip 
                            label={request.priority}
                            color={request.priority === 'High' ? 'error' : 
                                   request.priority === 'Medium' ? 'warning' : 'success'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{request.reporter}</TableCell>
                        <TableCell>{request.time}</TableCell>
                        <TableCell>
                          <Chip 
                            label={request.status}
                            color={request.status === 'Pending' ? 'warning' : 'info'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="contained" sx={{ mr: 1 }}>
                            Assign
                          </Button>
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Volunteers Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Active Volunteers
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Active Tasks</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeVolunteers.map((vol) => (
                      <TableRow key={vol.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {vol.name.charAt(0)}
                            </Avatar>
                            {vol.name}
                          </Box>
                        </TableCell>
                        <TableCell>{vol.tasks}</TableCell>
                        <TableCell>
                          <Chip 
                            label={vol.status}
                            color={vol.status === 'Available' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{vol.rating}</TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                            Assign Task
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Rescued Animals Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Animals in Care
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Health</TableCell>
                      <TableCell>Days in Care</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rescuedAnimals.map((animal) => (
                      <TableRow key={animal.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar>
                              {animal.type === 'Dog' ? '🐕' : '🐈'}
                            </Avatar>
                            {animal.name}
                          </Box>
                        </TableCell>
                        <TableCell>{animal.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={animal.status}
                            color={animal.status === 'Ready for adoption' ? 'success' : 
                                   animal.status === 'Recovering' ? 'info' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={animal.health}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{animal.daysInCare} days</TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                            Update
                          </Button>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default NGODashboard;