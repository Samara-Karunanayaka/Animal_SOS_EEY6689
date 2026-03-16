import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Box,
  TextField,
  MenuItem,
  Avatar,
  LinearProgress,
  Paper,
  Tabs,
  Tab,
  Badge,
  IconButton,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  Pets as PetsIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const TrackCases = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCases([
        {
          id: 1,
          animal: 'Dog',
          breed: 'Labrador Mix',
          location: 'Central Park, NY',
          status: 'In Progress',
          priority: 'High',
          time: '10 minutes ago',
          volunteer: 'John Doe',
          volunteerAvatar: 'JD',
          image: '🐕',
          description: 'Injured dog limping, needs immediate attention',
          updates: [
            { time: '2 min ago', text: 'Volunteer en route' },
            { time: '5 min ago', text: 'Case assigned to John Doe' },
          ],
        },
        {
          id: 2,
          animal: 'Cat',
          breed: 'Domestic Short Hair',
          location: 'Downtown, NY',
          status: 'Assigned',
          priority: 'Medium',
          time: '25 minutes ago',
          volunteer: 'Jane Smith',
          volunteerAvatar: 'JS',
          image: '🐈',
          description: 'Stray cat appears malnourished',
          updates: [
            { time: '15 min ago', text: 'Looking for volunteer' },
          ],
        },
        {
          id: 3,
          animal: 'Bird',
          breed: 'Pigeon',
          location: 'Riverside Park',
          status: 'Resolved',
          priority: 'Low',
          time: '1 hour ago',
          volunteer: 'Mike Johnson',
          volunteerAvatar: 'MJ',
          image: '🐦',
          description: 'Bird with injured wing, rescued and taken to vet',
          updates: [
            { time: '45 min ago', text: 'Rescue completed' },
            { time: '1 hour ago', text: 'At veterinary clinic' },
          ],
        },
        {
          id: 4,
          animal: 'Dog',
          breed: 'German Shepherd',
          location: 'North Park',
          status: 'Reported',
          priority: 'High',
          time: '5 minutes ago',
          volunteer: 'Not assigned',
          volunteerAvatar: 'NA',
          image: '🐕',
          description: 'Dog seems dehydrated and weak',
          updates: [],
        },
        {
          id: 5,
          animal: 'Rabbit',
          breed: 'Domestic',
          location: 'Community Garden',
          status: 'In Progress',
          priority: 'Medium',
          time: '30 minutes ago',
          volunteer: 'Sarah Wilson',
          volunteerAvatar: 'SW',
          image: '🐇',
          description: 'Abandoned rabbit needs rescue',
          updates: [
            { time: '20 min ago', text: 'Volunteer on the way' },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'In Progress': return 'info';
      case 'Assigned': return 'warning';
      case 'Reported': return 'error';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <ErrorIcon color="error" />;
      case 'Medium': return <WarningIcon color="warning" />;
      case 'Low': return <CheckCircleIcon color="success" />;
      default: return null;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const filteredCases = cases
    .filter(c => filter === 'all' ? true : c.status.toLowerCase() === filter)
    .filter(c => 
      searchTerm === '' ? true : 
      c.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
          Track Rescue Cases
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by animal or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Filter by Status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All Cases</MenuItem>
              <MenuItem value="reported">Reported</MenuItem>
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={5}>
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All Cases" />
              <Tab label="Near Me" />
              <Tab label="High Priority" />
              <Tab label="My Reports" />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>

      {/* Loading Indicator */}
      {loading && <LinearProgress sx={{ mb: 3 }} />}

      {/* Cases List */}
      <Grid container spacing={3}>
        {filteredCases.map((case_, index) => (
          <Grid item xs={12} key={case_.id}>
            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    {/* Animal Info */}
                    <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                      <Box sx={{ fontSize: '3rem' }}>{case_.image}</Box>
                      <Typography variant="h6">{case_.animal}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {case_.breed}
                      </Typography>
                    </Grid>

                    {/* Details */}
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body2">{case_.location}</Typography>
                      </Box>
                      
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <ScheduleIcon fontSize="small" color="action" />
                        <Typography variant="body2">{case_.time}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          Volunteer: {case_.volunteer}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="textSecondary" paragraph>
                        {case_.description}
                      </Typography>

                      {/* Recent Updates */}
                      {case_.updates.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="primary" gutterBottom>
                            Latest Update:
                          </Typography>
                          <Typography variant="body2">
                            {case_.updates[case_.updates.length - 1].text}
                          </Typography>
                        </Box>
                      )}
                    </Grid>

                    {/* Status & Actions */}
                    <Grid item xs={12} sm={4}>
                      <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          {getPriorityIcon(case_.priority)}
                          <Chip
                            label={case_.status}
                            color={getStatusColor(case_.status)}
                            size="small"
                          />
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: '0.75rem' }}>
                            {case_.volunteerAvatar}
                          </Avatar>
                          <Typography variant="caption">{case_.volunteer}</Typography>
                        </Box>

                        <Box display="flex" gap={1} mt={2}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<LocationIcon />}
                          >
                            Track
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ bgcolor: 'primary.main' }}
                          >
                            Details
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredCases.length === 0 && !loading && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No cases found
          </Typography>
          <Typography color="textSecondary">
            Try adjusting your filters or check back later
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default TrackCases;