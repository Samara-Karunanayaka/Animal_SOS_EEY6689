import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Pets as PetsIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerIcon,
  Payment as PaymentIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(null);

  const categories = [
    { icon: <PetsIcon />, label: 'Reporting', color: '#FF6B6B' },
    { icon: <FavoriteIcon />, label: 'Adoption', color: '#4ECDC4' },
    { icon: <VolunteerIcon />, label: 'Volunteering', color: '#95E1D3' },
    { icon: <PaymentIcon />, label: 'Donations', color: '#FFE194' },
  ];

  const faqs = [
    {
      category: 'Reporting',
      question: 'How do I report an animal in need?',
      answer: 'Click on the "Report Animal" button in the navigation menu. You can upload photos, add the location (GPS or map selection), and provide a description. Our system will automatically notify the nearest available volunteer.',
    },
    {
      category: 'Reporting',
      question: 'What information should I provide?',
      answer: 'Please provide clear photos of the animal, exact location, description of the animal\'s condition, and any urgent medical needs. The more details you provide, the better prepared our volunteers will be.',
    },
    {
      category: 'Reporting',
      question: 'Is it free to report an animal?',
      answer: 'Yes, reporting an animal is completely free. Our service is funded by donations and grants.',
    },
    {
      category: 'Adoption',
      question: 'How does the adoption process work?',
      answer: 'Browse available animals, click "Adopt Me" on any animal you\'re interested in, fill out the adoption application. The NGO will contact you within 24 hours to schedule a meet-and-greet.',
    },
    {
      category: 'Adoption',
      question: 'What is the adoption fee?',
      answer: 'The adoption fee is $150, which includes vaccinations, spaying/neutering, microchipping, and a health checkup.',
    },
    {
      category: 'Adoption',
      question: 'Can I adopt if I live in an apartment?',
      answer: 'Yes, but we need to ensure the animal is suitable for apartment living. Some animals are better suited for homes with yards.',
    },
    {
      category: 'Volunteering',
      question: 'How do I become a volunteer?',
      answer: 'Register as a volunteer, complete our online training program, and pass a background check. Once verified, you\'ll start receiving rescue assignments.',
    },
    {
      category: 'Volunteering',
      question: 'What are the requirements?',
      answer: 'You must be 18 years or older, have a valid ID, complete training, and pass a background check. No prior experience required - we provide all training.',
    },
    {
      category: 'Volunteering',
      question: 'How much time do I need to commit?',
      answer: 'There\'s no minimum time commitment. You can choose which rescue missions to accept based on your availability.',
    },
    {
      category: 'Donations',
      question: 'How are donations used?',
      answer: 'Donations fund medical treatment, food, shelter, rescue equipment, and rehabilitation programs. 85% of donations go directly to animal care.',
    },
    {
      category: 'Donations',
      question: 'Are donations tax-deductible?',
      answer: 'Yes, we are a registered 501(c)(3) nonprofit organization. All donations are tax-deductible, and you\'ll receive a receipt via email.',
    },
    {
      category: 'Donations',
      question: 'Can I donate items instead of money?',
      answer: 'Yes! We accept food, blankets, toys, medical supplies, and other items. Contact us to arrange drop-off or pickup.',
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: '#FF6B6B', fontWeight: 700 }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Find answers to common questions about our services
        </Typography>

        {/* Search */}
        <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
          <TextField
            fullWidth
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Paper>
      </Box>

      {/* Categories */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {categories.map((cat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: cat.color, margin: '0 auto 8px' }}>
                  {cat.icon}
                </Avatar>
                <Typography>{cat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQs */}
      <Paper sx={{ p: 3 }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Chip
                    label={faq.category}
                    size="small"
                    sx={{
                      bgcolor: 
                        faq.category === 'Reporting' ? '#FF6B6B' :
                        faq.category === 'Adoption' ? '#4ECDC4' :
                        faq.category === 'Volunteering' ? '#95E1D3' : '#FFE194',
                      color: 'white',
                    }}
                  />
                  <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ pl: 10 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box textAlign="center" py={4}>
            <HelpIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              No FAQs found
            </Typography>
            <Typography color="textSecondary">
              Try searching with different keywords
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Still Need Help */}
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center', bgcolor: '#F8F9FA' }}>
        <Typography variant="h5" gutterBottom>
          Still need help?
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Can't find the answer you're looking for? Contact our support team.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Chip
            icon={<PetsIcon />}
            label="Live Chat"
            clickable
            sx={{ bgcolor: '#FF6B6B', color: 'white' }}
          />
          <Chip
            icon={<FavoriteIcon />}
            label="Email Support"
            clickable
            sx={{ bgcolor: '#4ECDC4', color: 'white' }}
          />
          <Chip
            icon={<VolunteerIcon />}
            label="Call Us"
            clickable
            sx={{ bgcolor: '#95E1D3', color: 'white' }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default FAQ;