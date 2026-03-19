import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Paper,
  LinearProgress,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Fade,
  Chip,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerIcon,
  Pets as PetsIcon,
  LocalHospital as HospitalIcon,
  Restaurant as FoodIcon,
  Home as ShelterIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  Payment as PayPalIcon,
} from '@mui/icons-material';
import { cardStyles } from '../utils/cardStyles';
import { useNotification } from '../contexts/NotificationContext';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addNotification } = useNotification();

  const presetAmounts = [210, 225, 250, 300, 450, 700];

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleDonate = () => {
    const donationAmount = customAmount || amount;
    if (!donationAmount || donationAmount < 1) {
      addNotification({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please enter a valid donation amount',
      });
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      
      addNotification({
        type: 'success',
        title: 'Thank You!',
        message: `Your donation of Rs${donationAmount} has been received.`,
      });
      
      setTimeout(() => setShowSuccess(false), 5000);
      setAmount('');
      setCustomAmount('');
    }, 2000);
  };

  const impactItems = [
    {
      icon: <FoodIcon />,
      title: 'Provides Food',
      description: 'Feeds a rescued animal for one month',
      amount: 2250,
    },
    {
      icon: <HospitalIcon />,
      title: 'Medical Care',
      description: 'Covers vaccination and basic checkup',
      amount: 2500,
    },
    {
      icon: <ShelterIcon />,
      title: 'Shelter Support',
      description: 'Provides bedding and shelter for one week',
      amount: 2000,
    },
    {
      icon: <PetsIcon />,
      title: 'Full Rescue',
      description: 'Complete rescue and rehabilitation',
      amount: 3500,
    },
  ];

  const recentDonations = [
    { name: 'Anonymous', amount: 3000, time: '5 min ago' },
    { name: 'Ravi J.', amount: 2500, time: '1 hour ago' },
    { name: 'Priya S.', amount: 2500, time: '3 hours ago' },
    { name: 'Anil P.', amount: 4000, time: '5 hours ago' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <FavoriteIcon /> Make a Difference Today
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Your donation helps provide food, shelter, and medical care for animals in need
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Donation Form */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Make a Donation
            </Typography>

            {/* Donation Type */}
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Donation Type</FormLabel>
              <RadioGroup
                row
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
              >
                <FormControlLabel
                  value="one-time"
                  control={<Radio />}
                  label="One-time"
                />
                <FormControlLabel
                  value="monthly"
                  control={<Radio />}
                  label="Monthly"
                />
                <FormControlLabel
                  value="yearly"
                  control={<Radio />}
                  label="Yearly"
                />
              </RadioGroup>
            </FormControl>

            {/* Amount Selection */}
            <Typography gutterBottom sx={{ fontWeight: 500 }}>
              Select Amount
            </Typography>
            <Grid container spacing={1} sx={{ mb: 3 }}>
              {presetAmounts.map((preset) => (
                <Grid item key={preset}>
                  <Button
                    variant={amount === preset ? 'contained' : 'outlined'}
                    onClick={() => handleAmountSelect(preset)}
                    sx={{
                      minWidth: 80,
                      bgcolor: amount === preset ? 'primary.main' : 'transparent',
                    }}
                  >
                    Rs{preset}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {/* Custom Amount */}
            <TextField
              fullWidth
              label="Or enter custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount('');
              }}
              type="number"
              InputProps={{
                startAdornment: 'Rs',
              }}
              sx={{ mb: 3 }}
            />

            {/* Payment Method */}
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <CardIcon color="primary" />
                        <span>Credit / Debit Card</span>
                      </Box>
                    }
                  />
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
                  <FormControlLabel
                    value="bank"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <BankIcon color="primary" />
                        <span>Bank Transfer</span>
                      </Box>
                    }
                  />
                </Paper>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <PayPalIcon color="primary" />
                        <span>PayPal</span>
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>
            </FormControl>

            {/* Payment Details (simplified) */}
            {paymentMethod === 'card' && (
              <Fade in={true}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField fullWidth label="Expiry Date" placeholder="MM/YY" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="CVV" placeholder="123" />
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )}

            {/* Donate Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleDonate}
              disabled={(!customAmount && !amount) || loading}
              sx={{
                py: 2,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {loading ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <LinearProgress size={20} sx={{ width: 20 }} />
                  Processing...
                </Box>
              ) : (
                `Donate Rs${customAmount || amount || '0'} ${donationType === 'monthly' ? '/month' : donationType === 'yearly' ? '/year' : ''}`
              )}
            </Button>

            {/* Secure Payment Note */}
            <Typography variant="caption" color="textSecondary" align="center" display="block" sx={{ mt: 2 }}>
              🔒 Secure payment processed with SSL encryption
            </Typography>
          </Paper>
        </Grid>

        {/* Impact & Info */}
        <Grid item xs={12} md={5}>
          {/* Impact Calculator */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Your Impact
              </Typography>
              <List>
                {impactItems.map((item, index) => (
                  <ListItem key={index} divider={index < impactItems.length - 1}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        {item.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={item.description}
                    />
                    <Chip
                      label={`Rs${item.amount}`}
                      color="primary"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Donations
              </Typography>
              <List>
                {recentDonations.map((donation, index) => (
                  <ListItem key={index} divider={index < recentDonations.length - 1}>
                    <ListItemAvatar>
                      <Avatar>
                        <VolunteerIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={donation.name}
                      secondary={donation.time}
                    />
                    <Typography variant="subtitle2" color="primary">
                      Rs{donation.amount}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Tax Info */}
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              💚 Tax Deductible
            </Typography>
            <Typography variant="body2">
              All donations are tax-deductible. You will receive a receipt via email.
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      {/* Success Message */}
      {showSuccess && (
        <Fade in={showSuccess}>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              p: 2,
              bgcolor: 'success.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              zIndex: 9999,
            }}
          >
            <CheckCircleIcon />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Thank You!
              </Typography>
              <Typography variant="body2">
                Your donation has been received.
              </Typography>
            </Box>
          </Paper>
        </Fade>
      )}
    </Container>
  );
};

export default Donation;