import {
  Grid, Card, CardContent, Typography, Box, Button, Chip,
  LinearProgress, Avatar, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material'
import { StarRate, Image, PlayCircle, Chat, Star, Lightbulb, ArrowUpward } from '@mui/icons-material'
import { readinessScores, aiRecommendations } from '../data/dummyData'
import PageHeader from '../components/PageHeader'
import ScoreCircle from '../components/ScoreCircle'
import StatusChip from '../components/StatusChip'

const scoreItems = [
  { key: 'tagline', label: 'Tagline Quality', icon: '✍️', color: '#6C5CE7' },
  { key: 'thumbnail', label: 'Thumbnail', icon: '🖼️', color: '#E17055' },
  { key: 'description', label: 'Description', icon: '📄', color: '#00CEC9' },
  { key: 'socialProof', label: 'Social Proof', icon: '⭐', color: '#FDCB6E' },
  { key: 'firstComment', label: 'First Comment', icon: '💬', color: '#A29BFE' },
  { key: 'media', label: 'Media Gallery', icon: '🎬', color: '#E17055' },
  { key: 'timing', label: 'Launch Timing', icon: '⏰', color: '#00B894' },
]

export default function ReadinessScore() {
  return (
    <Box>
      <PageHeader
        title="Launch Readiness Score"
        subtitle="AI-powered analysis of your Product Hunt launch readiness"
        icon={<StarRate />}
        breadcrumb
        action={
          <Button variant="contained" startIcon={<ArrowUpward />} size="small">
            Improve Score
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        {/* Main Score */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #00CEC9 100%)',
            color: '#fff',
          }}>
            <CardContent sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, opacity: 0.9 }}>Overall Readiness</Typography>
              <Box sx={{ position: 'relative', width: 160, height: 160, mx: 'auto', mb: 3 }}>
                <svg width={160} height={160} style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx={80} cy={80} r={66} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={12} />
                  <circle cx={80} cy={80} r={66} fill="none" stroke="#fff" strokeWidth={12}
                    strokeDasharray={2 * Math.PI * 66}
                    strokeDashoffset={(1 - readinessScores.overall / 100) * 2 * Math.PI * 66}
                    strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s' }}
                  />
                </svg>
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h2" fontWeight={800}>{readinessScores.overall}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>/100</Typography>
                </Box>
              </Box>
              <Chip
                label={readinessScores.overall >= 80 ? '🚀 Launch Ready!' : readinessScores.overall >= 60 ? '⚠️ Almost Ready' : '❌ Not Ready'}
                sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, mb: 2 }}
              />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {readinessScores.overall < 80 ? 'Improve 3 key areas to reach launch-ready status.' : 'You are ready to launch! Review final checklist.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Score Breakdown */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Score Breakdown</Typography>
              <Grid container spacing={2}>
                {scoreItems.map((item) => {
                  const score = readinessScores[item.key]
                  return (
                    <Grid size={{ xs: 6, sm: 4 }} key={item.key}>
                      <Box sx={{ p: 2, borderRadius: 2.5, border: '1px solid', borderColor: 'divider', textAlign: 'center', '&:hover': { borderColor: item.color, background: item.color + '08' }, transition: 'all 0.2s' }}>
                        <Typography variant="h4" sx={{ mb: 0.5 }}>{item.icon}</Typography>
                        <Typography variant="h5" fontWeight={800} sx={{ color: item.color }}>{score}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{item.label}</Typography>
                        <LinearProgress variant="determinate" value={score} sx={{ mt: 1, height: 6, borderRadius: 4, '& .MuiLinearProgress-bar': { background: item.color } }} />
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Lightbulb color="warning" />
                <Typography variant="h6" fontWeight={700}>AI Recommendations</Typography>
                <Chip label="AI Powered" size="small" color="primary" sx={{ ml: 1, fontWeight: 600 }} />
              </Box>
              <Grid container spacing={2}>
                {aiRecommendations.map((rec, i) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                    <Box sx={{
                      p: 2.5, borderRadius: 2.5, border: '1px solid', borderColor: 'divider',
                      borderLeft: '4px solid',
                      borderLeftColor: rec.priority === 'High' ? 'error.main' : rec.priority === 'Medium' ? 'warning.main' : 'success.main',
                      '&:hover': { boxShadow: 2 }, transition: 'box-shadow 0.2s',
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <StatusChip status={rec.priority} />
                        <Typography variant="subtitle2" fontWeight={700}>{rec.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">{rec.desc}</Typography>
                      <Button size="small" sx={{ mt: 1.5, px: 0 }}>Fix This →</Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
