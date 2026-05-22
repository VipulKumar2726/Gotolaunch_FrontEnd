import React, { useState } from 'react'
import {
  Box, Typography, Grid, Paper, Select, MenuItem, FormControl, InputLabel,
  Button, Chip, LinearProgress, CircularProgress
} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CampaignIcon from '@mui/icons-material/Campaign'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import { advisorRecs, productTypes, industries, audiences, goals } from '../data/advisor'

export default function Advisor() {
  const [form, setForm] = useState({ type: 'SaaS Tool', industry: 'Productivity', audience: 'Indie Hackers & Founders', goal: 'Get First 100 Users' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const run = () => {
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(advisorRecs[form.type] || advisorRecs['SaaS Tool'])
      setLoading(false)
    }, 900)
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>AI Launch Advisor</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>Get personalized launch strategy recommendations</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Box sx={{ background: 'linear-gradient(135deg,#f3f0ff,#e0f7ff)', border: '1px solid rgba(91,74,247,0.15)', borderRadius: 3, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Tell us about your product</Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 3 }}>Answer a few questions to get tailored recommendations</Typography>
            {[
              { key: 'type', label: 'Product Type', options: productTypes },
              { key: 'industry', label: 'Industry', options: industries },
              { key: 'audience', label: 'Target Audience', options: audiences },
              { key: 'goal', label: 'Launch Goal', options: goals },
            ].map(({ key, label, options }) => (
              <FormControl fullWidth size="small" key={key} sx={{ mb: 2 }}>
                <InputLabel sx={{ fontSize: 13 }}>{label}</InputLabel>
                <Select value={form[key]} onChange={handleChange(key)} label={label} sx={{ fontSize: 13.5, borderRadius: 2, bgcolor: '#fff' }}>
                  {options.map((o) => <MenuItem key={o} value={o} sx={{ fontSize: 13.5 }}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            ))}
            <Button variant="contained" fullWidth startIcon={<AutoAwesomeIcon />} onClick={run} disabled={loading} sx={{ borderRadius: 2, py: 1.2 }}>
              {loading ? 'Analyzing...' : 'Get My Launch Strategy'}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          {loading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
              <CircularProgress color="primary" />
              <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Analyzing your product profile...</Typography>
            </Box>
          )}
          {!loading && !result && (
            <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
              <Typography sx={{ fontSize: 52, mb: 2, opacity: 0.5 }}>🤖</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Ready when you are</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>Fill in the form and click "Get My Launch Strategy" to receive personalized recommendations.</Typography>
            </Box>
          )}
          {result && (
            <Paper elevation={0} sx={{ p: 3, border: '1px solid rgba(91,74,247,0.2)', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, background: 'linear-gradient(135deg,#5b4af7,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 15 }}>Launch Strategy Ready</Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>For {form.type} · {form.industry} · {form.goal}</Typography>
                </Box>
                <Chip label="Generated" color="success" size="small" sx={{ ml: 'auto', fontSize: 11 }} />
              </Box>
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'text.secondary', mb: 1 }}>Recommended Platforms</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
                {result.platforms.map((p) => <Chip key={p} label={p} color="primary" variant="outlined" size="small" sx={{ fontSize: 12 }} />)}
              </Box>
              {[
                { icon: <AccessTimeIcon sx={{ fontSize: 16 }} />, title: 'Best Launch Timing', content: result.timing },
                { icon: <CampaignIcon sx={{ fontSize: 16 }} />, title: 'Promotion Channels', isChips: true, content: result.channels },
                { icon: <LightbulbIcon sx={{ fontSize: 16 }} />, title: 'Launch Strategy', content: result.strategy },
              ].map((item) => (
                <Box key={item.title} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', bgcolor: 'background.default', borderRadius: 2, p: 1.5, mb: 1.25 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(91,74,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 13, mb: 0.5 }}>{item.title}</Typography>
                    {item.isChips ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {item.content.map((c) => <Chip key={c} label={c} color="info" variant="outlined" size="small" sx={{ fontSize: 10.5, height: 22 }} />)}
                      </Box>
                    ) : (
                      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.65 }}>{item.content}</Typography>
                    )}
                  </Box>
                </Box>
              ))}
              <Box sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 0.75 }}>Launch Readiness Score</Typography>
                <LinearProgress variant="determinate" value={result.readiness} sx={{ height: 8, borderRadius: 4 }} />
                <Typography sx={{ fontSize: 12, color: 'primary.main', fontWeight: 600, mt: 0.5 }}>{result.readiness}% ready</Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
