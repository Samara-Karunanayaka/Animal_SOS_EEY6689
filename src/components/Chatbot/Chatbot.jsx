import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Fab,
  Drawer,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Badge,
  Zoom,
  Alert,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Pets as PetsIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🐾 Hello! I'm your Animal Rescue Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
    setUnreadCount(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "I understand you need help. Let me connect you with a volunteer.",
        "To report an animal, click on the 'Report Animal' button in the navigation.",
        "You can track your rescue cases in the 'Track Cases' section.",
        "Would you like to know more about our adoption process?",
        "For emergencies, please call our 24/7 helpline: +1 (234) 567-890",
      ];
      
      const botMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'report') {
      navigate('/report');
      handleClose();
    } else if (action === 'track') {
      navigate('/track-cases');
      handleClose();
    } else if (action === 'adopt') {
      navigate('/adoption');
      handleClose();
    } else if (action === 'donate') {
      navigate('/donate');
      handleClose();
    }
  };

  return (
    <>
      <Zoom in={!open}>
        <Tooltip title="Chat with us" placement="left">
          <Fab
            color="primary"
            aria-label="chat"
            onClick={handleOpen}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 9998,
              width: 70,
              height: 70,
              bgcolor: '#FF6B6B',
              '&:hover': {
                bgcolor: '#FF5252',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s',
            }}
          >
            <Badge badgeContent={unreadCount} color="error" overlap="circular">
              <ChatIcon sx={{ fontSize: 30 }} />
            </Badge>
          </Fab>
        </Tooltip>
      </Zoom>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 350,
            maxWidth: 'calc(100vw - 40px)',
            height: 500,
            bottom: 20,
            right: 20,
            position: 'fixed',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 24,
          },
        }}
        variant="temporary"
        hideBackdrop
      >
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: 'white', color: '#FF6B6B' }}>
                <BotIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Rescue Assistant
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Online • 24/7 Support
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Alert severity="info" sx={{ borderRadius: 0 }}>
            <Typography variant="caption">
              ⏱️ Average response time: 30 seconds
            </Typography>
          </Alert>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              bgcolor: '#F5F5F5',
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                {message.sender === 'bot' && (
                  <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: '#FF6B6B' }}>
                    <BotIcon fontSize="small" />
                  </Avatar>
                )}
                <Box sx={{ maxWidth: '70%' }}>
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: message.sender === 'user' ? '#FF6B6B' : 'white',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                  </Paper>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      display: 'block',
                      textAlign: message.sender === 'user' ? 'right' : 'left',
                      mt: 0.5,
                      px: 1,
                    }}
                  >
                    {message.timestamp}
                  </Typography>
                </Box>
              </Box>
            ))}
            
            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#FF6B6B' }}>
                  <BotIcon fontSize="small" />
                </Avatar>
                <Paper sx={{ p: 1.5, bgcolor: 'white' }}>
                  <Typography variant="body2" color="textSecondary">
                    Typing...
                  </Typography>
                </Paper>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Actions */}
          <Box sx={{ p: 1, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
            <Box display="flex" gap={1} flexWrap="wrap">
              <Chip
                icon={<PetsIcon />}
                label="Report"
                size="small"
                onClick={() => handleQuickAction('report')}
                sx={{ bgcolor: '#FF6B6B', color: 'white' }}
              />
              <Chip
                icon={<LocationIcon />}
                label="Track"
                size="small"
                onClick={() => handleQuickAction('track')}
                sx={{ bgcolor: '#4ECDC4', color: 'white' }}
              />
              <Chip
                icon={<FavoriteIcon />}
                label="Adopt"
                size="small"
                onClick={() => handleQuickAction('adopt')}
                sx={{ bgcolor: '#95E1D3', color: 'white' }}
              />
              <Chip
                icon={<PhoneIcon />}
                label="Emergency"
                size="small"
                onClick={() => handleQuickAction('emergency')}
                sx={{ bgcolor: '#FFE194', color: 'white' }}
              />
            </Box>
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                sx={{ bgcolor: '#FF6B6B', color: 'white', '&:hover': { bgcolor: '#FF5252' } }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Drawer>
    </>
  );
};

export default Chatbot;