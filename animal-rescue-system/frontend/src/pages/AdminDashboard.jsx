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
  ListItemAvatar,
  Avatar,
  Chip,
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  VolunteerActivism as VolunteerIcon,
  Report as ReportIcon,
  Payments as PaymentsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
  Verified as VerifiedIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { cardStyles } from '../utils/cardStyles';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({});
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1245,
        totalNGOs: 23,
        totalVolunteers: 156,
        totalReports: 3456,
        totalDonations: 45250,
        totalAdoptions: 234,
        pendingApprovals: 8,
        flaggedContent: 12,
        systemHealth: 98,
      });

      setPendingApprovals([
        { id: 1, type: 'NGO', name: 'Pashu Seva Foundation', email: 'contact@animalcaresl.lk', date: '2024-03-10', documents: true },
        { id: 2, type: 'Volunteer', name: 'Sarah Jayasinghe', email: 'sarah.j@animalrescue.lk', date: '2024-03-09', documents: true },
        { id: 3, type: 'NGO', name: 'Pasubima Surakum Dala', email: 'info@pasusurakkumsl.lk', date: '2024-03-08', documents: false },
        { id: 4, type: 'Volunteer', name: 'Michael Perera', email: 'michael.t@animalrescue.lk', date: '2024-03-07', documents: true },
      ]);

      setRecentActivities([
        { id: 1, action: 'New NGO registered', user: 'Sathtu Sitpattun Foundation', time: '10 min ago', type: 'registration' },
        { id: 2, action: 'Report submitted', user: 'Diyatha Uyana Park', time: '25 min ago', type: 'report' },
        { id: 3, action: 'Donation received', user: '$500 from Anonymous', time: '1 hour ago', type: 'donation' },
        { id: 4, action: 'Adoption completed', user: 'Max the dog', time: '2 hours ago', type: 'adoption' },
        { id: 5, action: 'Flagged content', user: 'Report #1234', time: '3 hours ago', type: 'flag' },
      ]);

      setUsers([
        { id: 1, name: 'John Silva', role: 'Volunteer', status: 'Active', reports: 23, joined: 'Jan 2024' },
        { id: 2, name: 'Animal Care Sri Lanka', role: 'NGO', status: 'Pending', reports: 45, joined: 'Feb 2024' },
        { id: 3, name: 'Jane Fernando', role: 'Volunteer', status: 'Active', reports: 67, joined: 'Dec 2023' },
        { id: 4, name: 'Pasubima Surakum', role: 'NGO', status: 'Suspended', reports: 12, joined: 'Mar 2024' },
      ]);

      setReports([
        { id: 1, title: 'Injured dog', status: 'Resolved', priority: 'High', date: '2024-03-10' },
        { id: 2, title: 'Stray cat', status: 'In Progress', priority: 'Medium', date: '2024-03-09' },
        { id: 3, title: 'Abandoned rabbit', status: 'Pending', priority: 'Low', date: '2024-03-08' },
        { id: 4, title: 'Bird with broken wing', status: 'Flagged', priority: 'High', date: '2024-03-07' },
      ]);

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
        <Typography align="center" sx={{ mt: 2 }}>Loading admin dashboard...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'error.main', color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body1">
              System overview and management
            </Typography>
          </Grid>
          <Grid item>
            <Badge badgeContent={stats.pendingApprovals} color="warning">
              <Avatar sx={{ width: 60, height: 60, bgcolor: 'white', color: 'error.main' }}>
                <SecurityIcon sx={{ fontSize: 30 }} />
              </Avatar>
            </Badge>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyles.stats.sx}>
            <CardContent sx={{ p: cardStyles.padding.default }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Users
                  </Typography>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#667eea', width: cardStyles.avatarSizes.stats, height: cardStyles.avatarSizes.stats }}>
                  <PeopleIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyles.stats.sx}>
            <CardContent sx={{ p: cardStyles.padding.default }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    NGOs
                  </Typography>
                  <Typography variant="h4">{stats.totalNGOs}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#f6b93b', width: cardStyles.avatarSizes.stats, height: cardStyles.avatarSizes.stats }}>
                  <BusinessIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyles.stats.sx}>
            <CardContent sx={{ p: cardStyles.padding.default }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Volunteers
                  </Typography>
                  <Typography variant="h4">{stats.totalVolunteers}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#78e08f', width: cardStyles.avatarSizes.stats, height: cardStyles.avatarSizes.stats }}>
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
                    Reports
                  </Typography>
                  <Typography variant="h4">{stats.totalReports}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#fa983a' }}>
                  <ReportIcon />
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
                  <Typography variant="h4">${stats.totalDonations}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#60a3bc' }}>
                  <PaymentsIcon />
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
                    Adoptions
                  </Typography>
                  <Typography variant="h4">{stats.totalAdoptions}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#b8e994' }}>
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
                    Pending
                  </Typography>
                  <Typography variant="h4">{stats.pendingApprovals}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#ff9f43' }}>
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
                    System Health
                  </Typography>
                  <Typography variant="h4">{stats.systemHealth}%</Typography>
                </Box>
                <Avatar sx={{ bgcolor: stats.systemHealth > 90 ? '#6ab04c' : '#f0932b' }}>
                  <SettingsIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
          <Tab label="Pending Approvals" />
          <Tab label="User Management" />
          <Tab label="Reports" />
          <Tab label="System Logs" />
        </Tabs>
      </Paper>

      {/* Pending Approvals Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Pending Approvals
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Documents</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingApprovals.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Chip 
                            label={item.type}
                            color={item.type === 'NGO' ? 'secondary' : 'primary'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          {item.documents ? (
                            <Chip label="Uploaded" color="success" size="small" />
                          ) : (
                            <Chip label="Missing" color="error" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="contained" color="success" sx={{ mr: 1 }}>
                            Approve
                          </Button>
                          <Button size="small" variant="outlined" color="error">
                            Reject
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

      {/* User Management Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Management
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Reports</TableCell>
                      <TableCell>Joined</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {user.name.charAt(0)}
                            </Avatar>
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={user.role}
                            color={user.role === 'NGO' ? 'secondary' : 'primary'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={user.status}
                            color={user.status === 'Active' ? 'success' : 
                                   user.status === 'Pending' ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user.reports}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>
                          <IconButton size="small" color="primary">
                            <VerifiedIcon />
                          </IconButton>
                          <IconButton size="small" color="warning">
                            <WarningIcon />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <BlockIcon />
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

      {/* Reports Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Reports
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>#{report.id}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>
                          <Chip 
                            label={report.status}
                            color={report.status === 'Resolved' ? 'success' : 
                                   report.status === 'In Progress' ? 'info' :
                                   report.status === 'Flagged' ? 'error' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={report.priority}
                            color={report.priority === 'High' ? 'error' : 
                                   report.priority === 'Medium' ? 'warning' : 'success'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined">View</Button>
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

      {/* System Logs Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: activity.type === 'registration' ? 'success.main' :
                                activity.type === 'report' ? 'warning.main' :
                                activity.type === 'donation' ? 'info.main' : 'error.main'
                      }}>
                        {activity.type === 'registration' ? <PeopleIcon /> :
                         activity.type === 'report' ? <ReportIcon /> :
                         activity.type === 'donation' ? <PaymentsIcon /> : <WarningIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.user} • ${activity.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;