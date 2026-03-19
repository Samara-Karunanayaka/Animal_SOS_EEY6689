import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Button,
  Divider,
  Alert,
  TextField,
  Grid,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  VpnKey as VpnKeyIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const Settings = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });
  const [language, setLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FF6B6B', fontWeight: 700 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: '0 auto 16px',
                bgcolor: '#FF6B6B',
                fontSize: '3rem',
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {user?.email}
            </Typography>
            <Chip label={user?.role} size="small" sx={{ bgcolor: '#FF6B6B', color: 'white' }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Preferences
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon sx={{ color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive email updates about your activity"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon sx={{ color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Push Notifications" 
                  secondary="Receive push notifications in browser"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PhoneIcon sx={{ color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="SMS Notifications" 
                  secondary="Receive text messages for emergencies"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <Divider sx={{ my: 2 }} />

              <ListItem>
                <ListItemIcon>
                  <LanguageIcon sx={{ color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Language" 
                  secondary="Choose your preferred language"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small">
                    {language}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PaletteIcon sx={{ color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Dark Mode" 
                  secondary="Switch to dark theme"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <Divider sx={{ my: 2 }} />

              <ListItem>
                <ListItemIcon>
                  <VpnKeyIcon sx={{ color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Change Password" 
                  secondary="Update your password regularly"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small">
                    Update
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <DeleteIcon sx={{ color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Delete Account" 
                  secondary="Permanently delete your account"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" color="error" size="small">
                    Delete
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ bgcolor: '#FF6B6B' }}
              >
                Save Changes
              </Button>
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Changes will be applied immediately after saving.
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;