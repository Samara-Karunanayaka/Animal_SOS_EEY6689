import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  Chip,
  Paper,
  Alert,
  Grid,
  Avatar,
} from '@mui/material';
import {
  Mic as MicIcon,
  Stop as StopIcon,
  VolumeUp as VolumeUpIcon,
  GraphicEq as WaveIcon,
  SentimentSatisfied as SentimentIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const VoiceAnalyzer = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        analyzeVoice();
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzeVoice = async () => {
    setAnalyzing(true);
    
    // Simulate API call for voice analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTranscripts = [
      "I found an injured dog near the park. It's limping and looks very weak. Please help immediately!",
      "There's a stray cat with kittens behind my building. They look hungry and scared.",
      "A bird with a broken wing is in my backyard. Can someone come help?",
      "I see a dog that's been hit by a car on Colombo Street. It's an emergency!",
    ];
    
    const selectedTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
    setTranscript(selectedTranscript);
    
    const mockAnalysis = {
      sentiment: ['Very Urgent', 'Urgent', 'Concerned', 'Calm'][Math.floor(Math.random() * 4)],
      urgency: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      keywords: selectedTranscript.toLowerCase().split(' ').filter(w => w.length > 3).slice(0, 5),
      emotion: ['Distressed', 'Worried', 'Calm', 'Panicked'][Math.floor(Math.random() * 4)],
      tone: ['High-pitched', 'Normal', 'Low', 'Shaky'][Math.floor(Math.random() * 4)],
      confidence: Math.random() * 0.3 + 0.7,
    };
    
    setAnalysis(mockAnalysis);
    if (onAnalysisComplete) {
      onAnalysisComplete({ transcript: selectedTranscript, ...mockAnalysis });
    }
    setAnalyzing(false);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
            <VolumeUpIcon />
          </Avatar>
          <Typography variant="h6">Voice Description Analyzer</Typography>
        </Box>

        {/* Recording Interface */}
        <Box
          sx={{
            height: 150,
            bgcolor: 'grey.50',
            borderRadius: 2,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Record Button */}
          <IconButton
            onClick={isRecording ? stopRecording : startRecording}
            disabled={analyzing}
            sx={{
              bgcolor: isRecording ? 'error.main' : 'primary.main',
              color: 'white',
              width: 80,
              height: 80,
              '&:hover': {
                bgcolor: isRecording ? 'error.dark' : 'primary.dark',
              },
              animation: isRecording ? 'pulse 1s infinite' : 'none',
            }}
          >
            {isRecording ? <StopIcon sx={{ fontSize: 40 }} /> : <MicIcon sx={{ fontSize: 40 }} />}
          </IconButton>

          {/* Recording Status */}
          {isRecording && (
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              Recording...
            </Typography>
          )}
        </Box>

        {/* Analyzing Indicator */}
        {analyzing && (
          <Box my={2}>
            <LinearProgress />
            <Typography align="center" color="textSecondary" mt={1}>
              Analyzing voice description...
            </Typography>
          </Box>
        )}

        {/* Results */}
        {transcript && !analyzing && (
          <Box mt={2}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Transcript:
              </Typography>
              <Typography variant="body2" paragraph>
                "{transcript}"
              </Typography>
            </Alert>

            {analysis && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <SpeedIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="textSecondary">
                        Urgency
                      </Typography>
                    </Box>
                    <Chip
                      label={analysis.urgency}
                      color={analysis.urgency === 'High' ? 'error' : 
                             analysis.urgency === 'Medium' ? 'warning' : 'success'}
                      size="small"
                    />
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <SentimentIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="textSecondary">
                        Sentiment
                      </Typography>
                    </Box>
                    <Typography variant="body2">{analysis.sentiment}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <WaveIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="textSecondary">
                        Tone
                      </Typography>
                    </Box>
                    <Typography variant="body2">{analysis.tone}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <VolumeUpIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="textSecondary">
                        Confidence
                      </Typography>
                    </Box>
                    <Typography variant="body2">{Math.round(analysis.confidence * 100)}%</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Typography variant="caption" color="textSecondary" gutterBottom>
                      Keywords Detected
                    </Typography>
                    <Box display="flex" gap={0.5} flexWrap="wrap" mt={0.5}>
                      {analysis.keywords.map((keyword, index) => (
                        <Chip key={index} label={keyword} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceAnalyzer;