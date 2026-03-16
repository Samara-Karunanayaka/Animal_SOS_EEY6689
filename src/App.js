import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Layout Components
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Main Pages (Accessible without login for citizens)
import ReportAnimal from './pages/ReportAnimal';
import TrackCases from './pages/TrackCases';
import Adoption from './pages/Adoption';
import Donation from './pages/Donation';
import SuccessStories from './pages/SuccessStories';
import FAQ from './pages/FAQ';
import Tips from './pages/Tips';
import Impact from './pages/Impact';

// Protected Pages (Require login)
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';

// Role-specific Dashboards
import VolunteerDashboard from './pages/VolunteerDashboard';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerInfo from './pages/VolunteerInfo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',
      light: '#FF8A8A',
      dark: '#FF5252',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#6FD9D1',
      dark: '#45B7B0',
    },
    success: {
      main: '#95E1D3',
    },
    warning: {
      main: '#FFE194',
    },
    error: {
      main: '#FF6B6B',
    },
    background: {
      default: '#F9F9F9',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0 8px 16px rgba(255, 107, 107, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          borderRadius: 12,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Citizen Routes (No login required) */}
                <Route path="/report" element={<ReportAnimal />} />
                <Route path="/track-cases" element={<TrackCases />} />
                <Route path="/adoption" element={<Adoption />} />
                <Route path="/donate" element={<Donation />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/tips" element={<Tips />} />
                <Route path="/impact" element={<Impact />} />
                
                {/* Protected Routes (Require login) */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
                
                {/* Role-specific Routes */}
                <Route path="/volunteer" element={<PrivateRoute role="volunteer"><VolunteerDashboard /></PrivateRoute>} />
                <Route path="/ngo" element={<PrivateRoute role="ngo"><NGODashboard /></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
                <Route path="/volunteer-info" element={<VolunteerInfo />} />
                
                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;