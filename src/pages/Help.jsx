import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  MenuBook as MenuBookIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: "How do I report an animal in need?",
      answer: "Click on the 'Report Animal' button in the navigation menu. Upload photos, add location, and describe the situation. Our volunteers will be notified immediately."
    },
    {
      question: "How can I track my rescue case?",
      answer: "Go to 'Track Cases' section where you can see all active cases. You'll get real-time updates on the status and location of the rescue team."
    },
    {
      question: "What is the adoption process?",
      answer: "Browse available animals in 'Adoption' section, click 'Adopt Me' on any animal, fill out the application form. The NGO will contact you within 24 hours."
    },
    {
      question: "How can I become a volunteer?",
      answer: "Register as a volunteer, complete the training program, and pass the background check. Once verified, you'll start receiving rescue assignments."
    },
    {
      question: "How do I make a donation?",
      answer: "Visit the 'Donate' page, select or enter an amount, choose payment method, and complete the transaction. All donations are tax-deductible."
    },
    {
      question: "What should I do in an emergency?",
      answer: "Call our 24/7 emergency helpline: +1 (234) 567-899. You can also use the 'Report Animal' feature for immediate assistance."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FF6B6B', fontWeight: 700 }}>
        Help Center
      </Typography>

      {/* Search */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search for help topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Paper>

      <Grid container spacing={4}>
        {/* FAQ Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <HelpIcon sx={{ color: '#FF6B6B' }} />
              <Typography variant="h6">Frequently Asked Questions</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {filteredFaqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}

            {filteredFaqs.length === 0 && (
              <Typography color="textSecondary" align="center" py={3}>
                No FAQs found matching your search.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Contact Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Avatar sx={{ bgcolor: '#FF6B6B' }}>
                  <PhoneIcon />
                </Avatar>
                <Typography variant="h6">Emergency</Typography>
              </Box>
              <Typography variant="h5" sx={{ color: '#FF6B6B', fontWeight: 600 }}>
                +1 (234) 567-899
              </Typography>
              <Typography variant="body2" color="textSecondary">
                24/7 Emergency Helpline
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Avatar sx={{ bgcolor: '#4ECDC4' }}>
                  <EmailIcon />
                </Avatar>
                <Typography variant="h6">Email</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#4ECDC4' }}>
                support@animalrescue.org
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Response within 24 hours
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Avatar sx={{ bgcolor: '#95E1D3' }}>
                  <ChatIcon />
                </Avatar>
                <Typography variant="h6">Live Chat</Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ChatIcon />}
                sx={{ bgcolor: '#95E1D3', color: 'white' }}
              >
                Start Chat
              </Button>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
                Available 9 AM - 6 PM
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Avatar sx={{ bgcolor: '#FFE194' }}>
                  <MenuBookIcon />
                </Avatar>
                <Typography variant="h6">User Guide</Typography>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<MenuBookIcon />}
                sx={{ borderColor: '#FFE194', color: '#FFE194' }}
              >
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Help;