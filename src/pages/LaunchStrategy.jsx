import {
  Grid, Card, CardContent, Typography, Box, Button, Chip,
  LinearProgress, Stepper, Step, StepLabel, StepContent, Checkbox,
  FormControlLabel, Avatar,
} from '@mui/material'
import { Rocket, CheckCircle, Circle, AccessTime, Speed } from '@mui/icons-material'
import { useState } from 'react'
import { strategySteps, competitors, launchTimings } from '../data/dummyData'
import PageHeader from '../components/PageHeader'
import StatusChip from '../components/StatusChip'
import UpgradeBanner from '../components/UpgradeBanner'

export default function LaunchStrategy() {
  const [steps, setSteps] = useState(strategySteps)
  const completed = steps.filter(s => s.completed).length
  const progress = Math.round((completed / steps.length) * 100)

  const toggle = (id) => setSteps(s => s.map(x => x.id === id ? { ...x, completed: !x.completed } : x))

  return (
    <Box>
      <PageHeader
        title="Launch Strategy"
        subtitle="Build a winning Product Hunt launch plan step by step"
        icon={<Rocket />}
        breadcrumb
        action={<Button variant="contained" size="small">Download Checklist</Button>}
      />
      <UpgradeBanner title="Unlock AI Strategy Builder" subtitle="Get personalized launch strategies based on your product, category, and competition." />

      <Grid container spacing={2.5}>
        {/* Strategy Builder */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>Step-by-Step Strategy Builder</Typography>
                <Chip label={`${progress}% Complete`} color={progress >= 75 ? 'success' : progress >= 40 ? 'warning' : 'default'} size="small" sx={{ fontWeight: 700 }} />
              </Box>
              <LinearProgress variant="determinate" value={progress} sx={{ mb: 3, height: 10 }} color={progress >= 75 ? 'success' : 'primary'} />

              {steps.map((step) => (
                <Box
                  key={step.id}
                  sx={{
                    display: 'flex', gap: 2, p: 2, mb: 1.5, borderRadius: 2,
                    border: '1px solid', borderColor: step.completed ? 'success.main' : 'divider',
                    background: step.completed ? 'rgba(0,184,148,0.05)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <Box
                    onClick={() => toggle(step.id)}
                    sx={{
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                      background: step.completed ? 'success.main' : 'transparent',
                      border: '2px solid', borderColor: step.completed ? 'success.main' : 'divider',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.25,
                      color: '#fff',
                    }}
                  >
                    {step.completed && <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ textDecoration: step.completed ? 'line-through' : 'none', opacity: step.completed ? 0.6 : 1 }}>
                        {step.title}
                      </Typography>
                      <Chip
                        label={step.effort}
                        size="small"
                        sx={{
                          height: 18, fontSize: 10, fontWeight: 700,
                          background: step.effort === 'High' ? '#E1705520' : step.effort === 'Medium' ? '#FDCB6E20' : '#00B89420',
                          color: step.effort === 'High' ? '#E17055' : step.effort === 'Medium' ? '#e8a500' : '#00B894',
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">{step.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Grid container spacing={2.5}>
            {/* Recommended Timing */}
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AccessTime color="primary" />
                    <Typography variant="h6" fontWeight={700}>Recommended Launch Days</Typography>
                  </Box>
                  {launchTimings.map((t, i) => (
                    <Box key={i} sx={{ mb: 1.5, p: 1.5, borderRadius: 2, border: '1px solid', borderColor: i === 0 ? 'primary.main' : 'divider', background: i === 0 ? 'rgba(108,92,231,0.06)' : 'transparent' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                        <Typography variant="body2" fontWeight={700}>{t.day}</Typography>
                        <Chip label={`Score: ${t.score}`} size="small" color={i === 0 ? 'primary' : 'default'} sx={{ fontWeight: 700 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">{t.reason}</Typography>
                      <LinearProgress variant="determinate" value={t.score} sx={{ mt: 1, height: 6 }} color={i === 0 ? 'primary' : 'inherit'} />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Competitor Analysis */}
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Competitor Analysis</Typography>
                  {competitors.map((c, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5, p: 1.5, borderRadius: 2, background: 'rgba(108,92,231,0.04)', border: '1px solid', borderColor: 'divider' }}>
                      <Avatar sx={{ width: 36, height: 36, background: `hsl(${i * 80}, 60%, 55%)`, fontSize: 13, fontWeight: 700 }}>
                        {c.name[0]}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" fontWeight={700} noWrap>{c.name}</Typography>
                          <Chip label={c.rank} size="small" sx={{ fontWeight: 700, background: 'rgba(108,92,231,0.12)', color: 'primary.main' }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary">{c.strength} · {c.upvotes} upvotes</Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
