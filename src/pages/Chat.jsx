import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    // Mock data
    setChats([
      { 
        id: 1, 
        name: 'John (Volunteer)', 
        lastMessage: 'On my way to the location', 
        time: '5 min ago', 
        avatar: '👤',
        unread: 2,
        online: true,
        role: 'volunteer'
      },
      { 
        id: 2, 
        name: 'Animal Care NGO', 
        lastMessage: 'We received your report', 
        time: '1 hour ago', 
        avatar: '🏢',
        unread: 0,
        online: false,
        role: 'ngo'
      },
      { 
        id: 3, 
        name: 'Dr. Smith (Vet)', 
        lastMessage: 'The dog is recovering well', 
        time: '2 hours ago', 
        avatar: '👨‍⚕️',
        unread: 1,
        online: true,
        role: 'vet'
      },
      {
        id: 4,
        name: 'Sarah (Volunteer)',
        lastMessage: 'I need help with the rescue',
        time: '3 hours ago',
        avatar: '👩',
        unread: 0,
        online: false,
        role: 'volunteer'
      }
    ]);

    setMessages({
      1: [
        { id: 1, sender: 'John (Volunteer)', text: 'I received your rescue request', time: '10:30 AM', isMe: false },
        { id: 2, sender: 'You', text: 'Thank you! The dog is near the park entrance', time: '10:32 AM', isMe: true },
        { id: 3, sender: 'John (Volunteer)', text: "I'm on my way. ETA 10 minutes", time: '10:35 AM', isMe: false },
        { id: 4, sender: 'John (Volunteer)', text: 'Can you describe the dog?', time: '10:36 AM', isMe: false },
      ],
      2: [
        { id: 1, sender: 'Animal Care NGO', text: 'Your report has been received', time: '9:00 AM', isMe: false },
        { id: 2, sender: 'You', text: 'When will someone come?', time: '9:05 AM', isMe: true },
        { id: 3, sender: 'Animal Care NGO', text: 'A volunteer has been assigned', time: '9:10 AM', isMe: false },
      ],
      3: [
        { id: 1, sender: 'Dr. Smith (Vet)', text: 'The dog is responding well to treatment', time: '2:00 PM', isMe: false },
        { id: 2, sender: 'You', text: 'Thats great news! When can we visit?', time: '2:05 PM', isMe: true },
        { id: 3, sender: 'Dr. Smith (Vet)', text: 'Tomorrow afternoon would be fine', time: '2:10 PM', isMe: false },
      ],
    });
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages({
      ...messages,
      [selectedChat]: [...(messages[selectedChat] || []), newMessage]
    });
    
    // Update last message in chat list
    setChats(chats.map(chat => 
      chat.id === selectedChat 
        ? { ...chat, lastMessage: message, time: 'Just now' }
        : chat
    ));
    
    setMessage('');
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: 'calc(100vh - 100px)' }}>
      <Paper sx={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
        {/* Chat List Sidebar */}
        <Box sx={{ width: 320, borderRight: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Messages
            </Typography>
            <TextField
              fullWidth
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Divider />
          
          <List sx={{ height: 'calc(100% - 110px)', overflow: 'auto' }}>
            {filteredChats.map((chat) => (
              <ListItem
                key={chat.id}
                button
                selected={selectedChat === chat.id}
                onClick={() => setSelectedChat(chat.id)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    color="success"
                    variant="dot"
                    invisible={!chat.online}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {chat.avatar}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {chat.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {chat.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        noWrap
                        sx={{ maxWidth: 150 }}
                      >
                        {chat.lastMessage}
                      </Typography>
                      {chat.unread > 0 && (
                        <Badge badgeContent={chat.unread} color="primary" />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {chats.find(c => c.id === selectedChat)?.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {chats.find(c => c.id === selectedChat)?.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {chats.find(c => c.id === selectedChat)?.online ? 'Online' : 'Offline'}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {(messages[selectedChat] || []).map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    {!msg.isMe && (
                      <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                        {chats.find(c => c.id === selectedChat)?.avatar}
                      </Avatar>
                    )}
                    <Box sx={{ maxWidth: '70%' }}>
                      <Paper
                        sx={{
                          p: 1.5,
                          bgcolor: msg.isMe ? 'primary.main' : 'grey.100',
                          color: msg.isMe ? 'white' : 'inherit',
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body2">{msg.text}</Typography>
                      </Paper>
                      <Typography 
                        variant="caption" 
                        color="textSecondary"
                        sx={{ 
                          display: 'block',
                          textAlign: msg.isMe ? 'right' : 'left',
                          mt: 0.5,
                          px: 1
                        }}
                      >
                        {msg.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Grid container spacing={1}>
                  <Grid item>
                    <IconButton>
                      <AttachFileIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <EmojiIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      sx={{ height: '100%' }}
                    >
                      <SendIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
              }}
            >
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'grey.300', mb: 2 }}>
                <SendIcon sx={{ fontSize: 40, color: 'grey.500' }} />
              </Avatar>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Your Messages
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Select a conversation to start chatting
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;