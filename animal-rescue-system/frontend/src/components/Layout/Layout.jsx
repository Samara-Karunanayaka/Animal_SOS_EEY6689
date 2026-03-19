import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Fab,
  Grid,
  Paper,
  Tooltip,
  Chip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Pets as PetsIcon,
  TrackChanges as TrackChangesIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerActivismIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  ArrowUpward as ArrowUpwardIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import Chatbot from '../Chatbot/Chatbot';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const { notifications, showNotification, currentNotification, setShowNotification } = useNotification();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Report Animal', icon: <PetsIcon />, path: '/report' },
    { text: 'Track Cases', icon: <TrackChangesIcon />, path: '/track-cases' },
    { text: 'Adoption', icon: <FavoriteIcon />, path: '/adoption' },
    { text: 'Donate', icon: <VolunteerActivismIcon />, path: '/donate' },
    { text: 'Messages', icon: <ChatIcon />, path: '/chat' },
  ];

  const authenticatedMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const getRoleBasedMenuItems = () => {
    if (!user) return [];

    switch(user.role) {
      case 'volunteer':
        return [{ text: 'Volunteer Dashboard', icon: <VolunteerActivismIcon />, path: '/volunteer' }];
      case 'ngo':
        return [{ text: 'NGO Dashboard', icon: <BusinessIcon />, path: '/ngo' }];
      case 'admin':
        return [{ text: 'Admin Dashboard', icon: <SecurityIcon />, path: '/admin' }];
      default:
        return [];
    }
  };

  const roleBasedItems = getRoleBasedMenuItems();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
        color: 'white' 
      }}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            margin: '0 auto 10px',
            bgcolor: 'white',
            color: '#FF6B6B',
          }}
        >
          🐾
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Animal Rescue System
        </Typography>
        {user && (
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {user.name} • {user.role}
          </Typography>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 107, 107, 0.1)',
                borderRight: '4px solid',
                borderColor: '#FF6B6B',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? '#FF6B6B' : 'inherit' 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        
        {user && (
          <>
            <Divider sx={{ my: 1 }} />
            {authenticatedMenuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255, 107, 107, 0.1)',
                    borderRight: '4px solid',
                    borderColor: '#FF6B6B',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? '#FF6B6B' : 'inherit' 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            
            {roleBasedItems.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                {roleBasedItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => handleNavigation(item.path)}
                    selected={location.pathname === item.path}
                    sx={{
                      '&.Mui-selected': {
                        bgcolor: 'rgba(255, 107, 107, 0.1)',
                        borderRight: '4px solid',
                        borderColor: '#FF6B6B',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: location.pathname === item.path ? '#FF6B6B' : 'inherit' 
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </>
            )}
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flexGrow: 1,
            }}
            onClick={() => navigate('/')}
          >
            <Avatar
              sx={{
                bgcolor: '#FF6B6B',
                width: 40,
                height: 40,
                mr: 1,
              }}
            >
              🐾
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#FF6B6B',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Animal Rescue
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: location.pathname === item.path ? '#FF6B6B' : 'text.secondary',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    '&:hover': {
                      color: '#FF6B6B',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                onClick={handleNotificationMenuOpen}
                sx={{ position: 'relative' }}
              >
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {user ? (
              <>
                <Tooltip title="Profile">
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <Avatar
                      src={user.avatar}
                      sx={{ 
                        width: 35, 
                        height: 35, 
                        bgcolor: '#FF6B6B',
                        border: '2px solid',
                        borderColor: '#FF6B6B',
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {user.email}
                    </Typography>
                    <Chip 
                      label={user.role} 
                      size="small" 
                      sx={{ 
                        mt: 1,
                        bgcolor: '#FF6B6B',
                        color: 'white',
                        textTransform: 'capitalize',
                      }} 
                    />
                  </Box>
                  <Divider />
                  <MenuItem onClick={() => { handleNavigation('/profile'); handleProfileMenuClose(); }}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('/settings'); handleProfileMenuClose(); }}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('/help'); handleProfileMenuClose(); }}>
                    <ListItemIcon>
                      <HelpIcon fontSize="small" />
                    </ListItemIcon>
                    Help
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: '#FF6B6B',
                    color: '#FF6B6B',
                    '&:hover': {
                      borderColor: '#FF5252',
                      bgcolor: 'rgba(255,107,107,0.1)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: '#FF6B6B',
                    '&:hover': {
                      bgcolor: '#FF5252',
                    },
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 320,
            maxHeight: 400,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ p: 2, bgcolor: '#F5F5F5' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary">No notifications</Typography>
          </Box>
        ) : (
          notifications.slice(0, 5).map((notif) => (
            <MenuItem key={notif.id} sx={{ whiteSpace: 'normal', py: 1.5 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: notif.read ? 400 : 600 }}>
                  {notif.message}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {notif.time}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
        {notifications.length > 5 && (
          <>
            <Divider />
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Button size="small" color="primary">
                View All
              </Button>
            </Box>
          </>
        )}
      </Menu>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            bgcolor: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          bgcolor: '#1a1a1a',
          color: 'white',
          py: 6,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Avatar sx={{ bgcolor: '#FF6B6B' }}>🐾</Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#FF6B6B' }}>
                  Animal Rescue System
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                Dedicated to rescuing, rehabilitating, and rehoming animals in need. 
                Join us in making a difference in the lives of innocent animals.
              </Typography>
              <Box display="flex" gap={1}>
                <IconButton sx={{ color: 'white', '&:hover': { color: '#FF6B6B' } }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: 'white', '&:hover': { color: '#FF6B6B' } }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton sx={{ color: 'white', '&:hover': { color: '#FF6B6B' } }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: 'white', '&:hover': { color: '#FF6B6B' } }}>
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#FF6B6B' }}>
                Quick Links
              </Typography>
              <List dense>
                <ListItem button onClick={() => navigate('/report')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="Report Animal" />
                </ListItem>
                <ListItem button onClick={() => navigate('/adoption')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="Adopt a Pet" />
                </ListItem>
                <ListItem button onClick={() => navigate('/donate')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="Make Donation" />
                </ListItem>
                <ListItem button onClick={() => navigate('/volunteer')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="Volunteer" />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#FF6B6B' }}>
                Resources
              </Typography>
              <List dense>
                <ListItem button onClick={() => navigate('/faq')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="FAQs" />
                </ListItem>
                <ListItem button onClick={() => navigate('/success-stories')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="Success Stories" />
                </ListItem>
                <ListItem button onClick={() => navigate('/tips')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="Tips" />
                </ListItem>
                <ListItem button onClick={() => navigate('/impact')} sx={{ px: 0, color: 'rgba(255,255,255,0.7)' }}>
                  <ListItemText primary="Our Impact" />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#FF6B6B' }}>
                Contact Us
              </Typography>
              <Box sx={{ color: 'rgba(255,255,255,0.7)' }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <LocationIcon fontSize="small" sx={{ color: '#FF6B6B' }} />
                  <Typography variant="body2">No. 45, Saunders Place, Colombo 7</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <PhoneIcon fontSize="small" sx={{ color: '#FF6B6B' }} />
                  <Typography variant="body2">+94 11 234 5678</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <EmailIcon fontSize="small" sx={{ color: '#FF6B6B' }} />
                  <Typography variant="body2">info@animalrescue.lk</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <InfoIcon fontSize="small" sx={{ color: '#FF6B6B' }} />
                  <Typography variant="body2">24/7 Emergency: +94 11 234 1199</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
          
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © {new Date().getFullYear()} Animal Rescue System. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Made with ❤️ for animals everywhere
            </Typography>
          </Box>
        </Container>
      </Box>

      {showNotification && currentNotification && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            top: 80,
            right: 20,
            zIndex: 9999,
            p: 2,
            bgcolor: currentNotification.type === 'success' ? '#4CAF50' : '#FF6B6B',
            color: 'white',
            maxWidth: 300,
            borderRadius: 2,
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {currentNotification.title}
            </Typography>
            <IconButton size="small" onClick={() => setShowNotification(false)} sx={{ color: 'white' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2">
            {currentNotification.message}
          </Typography>
        </Paper>
      )}

      {showScrollTop && (
        <Tooltip title="Back to top">
          <Fab
            color="primary"
            size="small"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 100,
              right: 20,
              zIndex: 9999,
              bgcolor: '#FF6B6B',
              '&:hover': {
                bgcolor: '#FF5252',
              },
              animation: 'fadeInUp 0.3s ease-out',
            }}
          >
            <ArrowUpwardIcon />
          </Fab>
        </Tooltip>
      )}

      <Chatbot />
    </Box>
  );
};

export default Layout;