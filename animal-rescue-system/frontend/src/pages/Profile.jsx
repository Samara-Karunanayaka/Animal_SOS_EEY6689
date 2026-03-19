import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Alert,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  History as HistoryIcon,
  Favorite as FavoriteIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { cardStyles } from '../utils/cardStyles';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { addNotification } = useNotification();
  
  const [editMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'John Silva',
    email: user?.email || 'john.silva@animalrescue.lk',
    phone: '+94 11 234 5678',
    location: 'Colombo, Western Province',
    bio: 'Animal lover and volunteer dedicated to helping animals in need. I believe every animal deserves a loving home.',
    organization: user?.role === 'ngo' ? 'Animal Care Sri Lanka' : '',
    role: user?.role || 'citizen',
    joinedDate: 'January 2024',
  });

  const stats = {
    reports: 24,
    rescues: 15,
    adoptions: 3,
    donations: 450,
    volunteerHours: 120,
    badges: 8,
  };

  const recentActivity = [
    { id: 1, action: 'Reported injured dog', date: '2 hours ago', icon: <PetsIcon /> },
    { id: 2, action: 'Donated $50', date: '1 day ago', icon: <FavoriteIcon /> },
    { id: 3, action: 'Adopted a cat', date: '1 week ago', icon: <PetsIcon /> },
    { id: 4, action: 'Completed rescue mission', date: '2 weeks ago', icon: <BadgeIcon /> },
  ];

  const achievements = [
    { id: 1, name: 'First Rescue', description: 'Completed first rescue mission', date: 'Jan 2024', icon: '🏆' },
    { id: 2, name: 'Super Supporter', description: 'Donated over $100', date: 'Feb 2024', icon: '⭐' },
    { id: 3, name: 'Animal Hero', description: 'Rescued 10+ animals', date: 'Mar 2024', icon: '🦸' },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditMode(false);
      addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated.',
      });
    }, 1500);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '3rem',
              }}
            >
              {profile.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {profile.name}
              </Typography>
              <Chip 
                label={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                color="primary"
                size="small"
              />
              {profile.role === 'ngo' && (
                <Chip label="Verified NGO" color="success" size="small" />
              )}
            </Box>
            <Typography color="textSecondary" gutterBottom>
              Member since {profile.joinedDate}
            </Typography>
            <Typography variant="body2" paragraph>
              {profile.bio}
            </Typography>
          </Grid>
          <Grid item>
            {!editMode ? (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Box display="flex" gap={1}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

        {loading && <LinearProgress sx={{ mt: 2 }} />}
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
          <Tab icon={<PersonIcon />} label="Profile Info" />
          <Tab icon={<HistoryIcon />} label="Activity" />
          <Tab icon={<BadgeIcon />} label="Achievements" />
          <Tab icon={<SecurityIcon />} label="Settings" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Profile Info Tab */}
          {tabValue === 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {editMode ? (
                <Box component="form">
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    margin="normal"
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    margin="normal"
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    margin="normal"
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    margin="normal"
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    margin="normal"
                  />
                  {profile.role === 'ngo' && (
                    <TextField
                      fullWidth
                      label="Organization"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      margin="normal"
                    />
                  )}
                </Box>
              ) : (
                <Box>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Full Name" 
                        secondary={profile.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={profile.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Phone" 
                        secondary={profile.phone}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Location" 
                        secondary={profile.location}
                      />
                    </ListItem>
                    {profile.role === 'ngo' && (
                      <ListItem>
                        <ListItemIcon>
                          <BadgeIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Organization" 
                          secondary={profile.organization}
                        />
                      </ListItem>
                    )}
                  </List>
                </Box>
              )}
            </Paper>
          )}

          {/* Activity Tab */}
          {tabValue === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        {activity.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.date}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Achievements Tab */}
          {tabValue === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Achievements & Badges
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                {achievements.map((achievement) => (
                  <Grid item xs={12} key={achievement.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: 'primary.main', fontSize: '2rem' }}>
                            {achievement.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {achievement.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {achievement.description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Earned: {achievement.date}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Settings Tab */}
          {tabValue === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Account Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Push Notifications" 
                    secondary="Receive notifications about case updates"
                  />
                  <Switch defaultChecked />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Receive email updates about your activity"
                  />
                  <Switch defaultChecked />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Language" 
                    secondary="English (United States)"
                  />
                  <Button size="small">Change</Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Two-Factor Authentication" 
                    secondary="Add extra security to your account"
                  />
                  <Switch />
                </ListItem>
              </List>

              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Delete Account</Typography>
                <Typography variant="body2">
                  Once you delete your account, there is no going back. Please be certain.
                </Typography>
                <Button color="error" variant="outlined" size="small" sx={{ mt: 1 }}>
                  Delete Account
                </Button>
              </Alert>
            </Paper>
          )}
        </Grid>

        {/* Stats Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Your Impact
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {stats.reports}
                    </Typography>
                    <Typography variant="body2">Reports</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {stats.rescues}
                    </Typography>
                    <Typography variant="body2">Rescues</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {stats.adoptions}
                    </Typography>
                    <Typography variant="body2">Adoptions</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      ${stats.donations}
                    </Typography>
                    <Typography variant="body2">Donations</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Volunteer Stats
              </Typography>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Hours This Month</Typography>
                  <Typography variant="body2" fontWeight={600}>32/40</Typography>
                </Box>
                <LinearProgress variant="determinate" value={80} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Total Hours</Typography>
                  <Typography variant="body2" fontWeight={600}>{stats.volunteerHours}</Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Badges Earned</Typography>
                  <Typography variant="body2" fontWeight={600}>{stats.badges}/20</Typography>
                </Box>
                <LinearProgress variant="determinate" value={40} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;