import React, { useState, useRef, useCallback } from 'react';
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
  Tooltip,
  Button,
} from '@mui/material';
import {
  Mic as MicIcon,
  Stop as StopIcon,
  VolumeUp as VolumeUpIcon,
  GraphicEq as WaveIcon,
  SentimentSatisfied as SentimentIcon,
  Speed as SpeedIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

// ── Word lists for analysis ──────────────────────────────────────────────────
const HIGH_WORDS = [
  'emergency','urgent','critical','dying','dead','bleeding','hit','accident',
  'immediately','serious','severe','trapped','drowning','attack','pain',
  'suffering','collapsed','unconscious','broken','blood','crisis','hurry',
];
const MEDIUM_WORDS = [
  'hurt','limping','sick','weak','stray','lost','scared','hungry','wound',
  'struggling','thin','malnourished','shaking','injured','injury','needs help',
];
const DISTRESS_WORDS = [
  'please','emergency','help','urgent','immediately','dying','terrible',
  'horrible','awful','poor','desperate','bad','cannot','cant',
];
const STOP_WORDS = new Set([
  'that','this','with','have','from','they','will','been','were','your',
  'what','when','where','there','their','about','which','would','could',
  'should','just','then','than','into','some','also','like','very','much',
  'really','being','doing','going','know','want','need','make','take',
]);

const analyzeText = (text) => {
  const lower = text.toLowerCase();
  const words  = lower.split(/\s+/);

  const highHits    = HIGH_WORDS.filter(w => lower.includes(w));
  const medHits     = MEDIUM_WORDS.filter(w => lower.includes(w));
  const distressHit = DISTRESS_WORDS.filter(w => lower.includes(w)).length;

  const urgency =
    highHits.length >= 1 ? 'High' :
    medHits.length  >= 1 ? 'Medium' : 'Low';

  const sentiment =
    distressHit >= 3 ? 'Very Urgent' :
    distressHit >= 2 ? 'Urgent' :
    distressHit >= 1 ? 'Concerned' : 'Calm';

  const tone =
    urgency === 'High'   ? 'High-pitched' :
    urgency === 'Medium' ? 'Normal' : 'Calm';

  const keywords = [...new Set(
    words
      .map(w => w.replace(/[^a-z]/g, ''))
      .filter(w => w.length > 3 && !STOP_WORDS.has(w))
  )].slice(0, 6);

  const matchCount = highHits.length + medHits.length;
  const confidence = Math.min(0.97, 0.60 + matchCount * 0.07);

  return { urgency, sentiment, tone, keywords, confidence };
};

// ── Component ────────────────────────────────────────────────────────────────
const VoiceAnalyzer = ({ onAnalysisComplete }) => {
  const [status, setStatus]         = useState('idle'); // idle | recording | analyzing | done | error
  const [transcript, setTranscript] = useState('');
  const [liveText, setLiveText]     = useState('');
  const [analysis, setAnalysis]     = useState(null);
  const [errorMsg, setErrorMsg]     = useState('');
  const [seconds, setSeconds]       = useState(0);

  const recognitionRef  = useRef(null);
  const timerRef        = useRef(null);
  const accTextRef      = useRef('');
  const isStoppingRef   = useRef(false);

  // ── Timer ──────────────────────────────────────────────────────────────────
  const startTimer = () => {
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };
  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };
  const fmt = s =>
    `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  // ── Analyze ────────────────────────────────────────────────────────────────
  const runAnalysis = useCallback((text) => {
    if (!text.trim()) {
      setErrorMsg('No speech detected. Please try again and speak clearly into your microphone.');
      setStatus('error');
      return;
    }
    setStatus('analyzing');
    setTimeout(() => {
      const result = analyzeText(text);
      setAnalysis(result);
      setStatus('done');
      if (onAnalysisComplete) onAnalysisComplete({ transcript: text, ...result });
    }, 900);
  }, [onAnalysisComplete]);

  // ── START ──────────────────────────────────────────────────────────────────
  const startRecording = useCallback(() => {
    setErrorMsg('');
    setTranscript('');
    setLiveText('');
    setAnalysis(null);
    accTextRef.current    = '';
    isStoppingRef.current = false;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg('Voice recognition is not supported. Please use Google Chrome or Microsoft Edge.');
      setStatus('error');
      return;
    }

    const recognition          = new SpeechRecognition();
    recognition.continuous     = true;
    recognition.interimResults = true;
    recognition.lang           = 'en-US';

    recognition.onstart = () => {
      setStatus('recording');
      startTimer();
    };

    recognition.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          accTextRef.current += r[0].transcript + ' ';
          setTranscript(accTextRef.current.trim());
        } else {
          interim += r[0].transcript;
        }
      }
      setLiveText(interim);
    };

    recognition.onerror = (e) => {
      clearTimer();
      if (e.error === 'not-allowed' || e.error === 'permission-denied') {
        setErrorMsg('Microphone access denied. Click the 🔒 icon in the browser address bar → allow microphone → then try again.');
      } else if (e.error === 'no-speech') {
        setErrorMsg('No speech detected. Make sure your microphone is working and speak clearly.');
      } else if (e.error === 'audio-capture') {
        setErrorMsg('No microphone found. Please connect a microphone and try again.');
      } else {
        setErrorMsg(`Microphone error: "${e.error}". Please refresh the page and try again.`);
      }
      setStatus('error');
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      clearTimer();
      setLiveText('');
      recognitionRef.current = null;
      if (isStoppingRef.current) {
        runAnalysis(accTextRef.current.trim());
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      setErrorMsg('Could not start microphone. Please refresh the page and try again.');
      setStatus('error');
    }
  }, [runAnalysis]);

  // ── STOP ───────────────────────────────────────────────────────────────────
  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      isStoppingRef.current = true;
      recognitionRef.current.stop();
      clearTimer();
      setStatus('analyzing');
    }
  }, []);

  // ── RESET ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    if (recognitionRef.current) {
      isStoppingRef.current = false;
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    clearTimer();
    setStatus('idle');
    setTranscript('');
    setLiveText('');
    setAnalysis(null);
    setErrorMsg('');
    setSeconds(0);
    accTextRef.current = '';
  };

  const urgencyColor = u =>
    u === 'High' ? 'error' : u === 'Medium' ? 'warning' : 'success';

  const isRecording = status === 'recording';
  const isAnalyzing = status === 'analyzing';
  const isDone      = status === 'done';
  const isError     = status === 'error';

  return (
    <Card elevation={2}>
      <CardContent>

        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
              <VolumeUpIcon />
            </Avatar>
            <Typography variant="h6">Voice Description Analyzer</Typography>
          </Box>
          {(isDone || isError || transcript) && (
            <Tooltip title="Reset and record again">
              <IconButton size="small" onClick={handleReset}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Error */}
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={handleReset}>
            {errorMsg}
          </Alert>
        )}

        {/* Recording box */}
        <Box
          sx={{
            minHeight: 160,
            bgcolor: isRecording ? 'rgba(211,47,47,0.06)' : 'grey.50',
            border: '2px solid',
            borderColor: isRecording ? 'error.main' : 'grey.200',
            borderRadius: 2,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            p: 2,
            transition: 'all 0.3s ease',
          }}
        >
          {/* Mic / Stop icon button */}
          <IconButton
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isAnalyzing}
            sx={{
              bgcolor: isRecording ? 'error.main' : 'primary.main',
              color: 'white',
              width: 80,
              height: 80,
              '&:hover': {
                bgcolor: isRecording ? 'error.dark' : 'primary.dark',
                transform: 'scale(1.05)',
              },
              '&:disabled': { bgcolor: 'grey.300' },
              transition: 'all 0.2s ease',
              '@keyframes pulseRing': {
                '0%':   { boxShadow: '0 0 0 0 rgba(211,47,47,0.6)' },
                '70%':  { boxShadow: '0 0 0 18px rgba(211,47,47,0)' },
                '100%': { boxShadow: '0 0 0 0 rgba(211,47,47,0)' },
              },
              animation: isRecording ? 'pulseRing 1.4s ease-out infinite' : 'none',
            }}
          >
            {isRecording
              ? <StopIcon sx={{ fontSize: 38 }} />
              : <MicIcon  sx={{ fontSize: 38 }} />}
          </IconButton>

          {/* Status text */}
          <Typography
            variant="body2"
            fontWeight={500}
            color={isRecording ? 'error.main' : 'text.secondary'}
            textAlign="center"
          >
            {isAnalyzing
              ? '⏳ Analyzing your voice...'
              : isRecording
                ? `🔴 Recording — ${fmt(seconds)} — Click STOP when done`
                : isDone
                  ? '✅ Done! Click 🔄 to record again'
                  : '🎙 Click the microphone button to start'}
          </Typography>

          {/* Live interim text */}
          {isRecording && liveText && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontStyle: 'italic',
                maxWidth: '90%',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              "{liveText}"
            </Typography>
          )}

          {/* Confirmed text preview */}
          {isRecording && transcript && (
            <Typography
              variant="caption"
              color="success.main"
              sx={{ maxWidth: '90%', textAlign: 'center' }}
            >
              ✔ Captured: "{transcript.slice(0, 80)}{transcript.length > 80 ? '...' : ''}"
            </Typography>
          )}
        </Box>

        {/* Big STOP button while recording */}
        {isRecording && (
          <Button
            variant="contained"
            color="error"
            fullWidth
            size="large"
            startIcon={<StopIcon />}
            onClick={stopRecording}
            sx={{ mb: 2, fontWeight: 700, fontSize: '1rem', py: 1.5 }}
          >
            STOP RECORDING
          </Button>
        )}

        {/* Analyzing progress bar */}
        {isAnalyzing && (
          <Box mb={2}>
            <LinearProgress color="secondary" />
            <Typography variant="body2" align="center" color="text.secondary" mt={1}>
              Analyzing voice description…
            </Typography>
          </Box>
        )}

        {/* Results */}
        {isDone && transcript && analysis && (
          <Box mt={1}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Transcript:
              </Typography>
              <Typography variant="body2">"{transcript}"</Typography>
            </Alert>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <SpeedIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">Urgency</Typography>
                  </Box>
                  <Chip
                    label={analysis.urgency}
                    color={urgencyColor(analysis.urgency)}
                    size="small"
                  />
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <SentimentIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">Sentiment</Typography>
                  </Box>
                  <Typography variant="body2">{analysis.sentiment}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <WaveIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">Tone</Typography>
                  </Box>
                  <Typography variant="body2">{analysis.tone}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <VolumeUpIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">Confidence</Typography>
                  </Box>
                  <Typography variant="body2">
                    {Math.round(analysis.confidence * 100)}%
                  </Typography>
                </Paper>
              </Grid>

              {analysis.keywords.length > 0 && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Keywords Detected
                    </Typography>
                    <Box display="flex" gap={0.5} flexWrap="wrap" mt={0.5}>
                      {analysis.keywords.map((kw, i) => (
                        <Chip key={i} label={kw} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        )}

        {/* Bottom tip */}
        {status === 'idle' && (
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1}>
            💡 Use Google Chrome for best results. Speak clearly about the animal's condition.
          </Typography>
        )}

      </CardContent>
    </Card>
  );
};

export default VoiceAnalyzer;
