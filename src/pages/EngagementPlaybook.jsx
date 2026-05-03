import {
  Grid, Card, CardContent, Typography, Box, Chip, Button,
  IconButton, Tooltip, Divider,
} from '@mui/material'
import { Forum, ContentCopy, Check, Bolt } from '@mui/icons-material'
import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer,
} from 'recharts'
import { commentTemplates, engagementMetrics } from '../data/dummyData'
import PageHeader from '../components/PageHeader'
import ScoreCircle from '../components/ScoreCircle'

const engagementTips = [
  { icon: '⚡', title: 'Reply within 10 minutes', desc: 'Fast replies signal active makers and boost Product Hunt ranking algorithm.' },
  { icon: '💡', title: 'Ask a follow-up question', desc: 'Turn every comment into a conversation — it doubles engagement time.' },
  { icon: '🎯', title: 'Personalize every reply', desc: 'Use the commenter\'s name and reference their specific point.' },
  { icon: '📢', title: 'Share milestone updates', desc: 'Post live updates ("We just hit #5!") to keep momentum going.' },
  { icon: '🤝', title: 'Support other launches', desc: 'Upvote and comment on other products — reciprocity is powerful.' },
  { icon: '📱', title: 'Post across channels', desc: 'Update LinkedIn, Twitter, and Slack groups every 2 hours with results.' },
]

export default function EngagementPlaybook() {
  const [copied, setCopied] = useState(null)
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const peakHour = engagementMetrics.reduce((a, b) => a.engagements > b.engagements ? a : b)

  return (
    <Box>
      <PageHeader
        title="Engagement Playbook"
        subtitle="Templates and strategies to maximize launch-day engagement"
        icon={<Forum />}
        breadcrumb
      />

      <Grid container spacing={2.5}>
        {/* Live Engagement Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Live Engagement Tracker</Typography>
                  <Typography variant="caption" color="text.secondary">Simulated engagement pattern across launch day hours</Typography>
                </Box>
                <Chip label={`Peak: ${peakHour.time}`} icon={<Bolt sx={{ fontSize: 14 }} />} color="warning" sx={{ fontWeight: 700 }} />
              </Box>
              <Box sx={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementMetrics} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,92,231,0.08)" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <RTooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="engagements" stroke="#6C5CE7" strokeWidth={2.5} fill="url(#engGrad)" name="Engagements" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Score */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Engagement Quality</Typography>
              <ScoreCircle score={78} size={140} color="#00CEC9" label="Engagement Score" />
              <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Fast Replies', 'Personalized', 'Consistent'].map(tag => (
                  <Chip key={tag} label={tag} size="small" color="success" sx={{ fontWeight: 600 }} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Comment Templates */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Comment Response Templates</Typography>
              {commentTemplates.map((t, i) => (
                <Box key={i} sx={{ mb: 2, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', position: 'relative' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip label={t.type} size="small" color="primary" sx={{ fontWeight: 700 }} />
                    <Tooltip title={copied === i ? 'Copied!' : 'Copy template'}>
                      <IconButton size="small" onClick={() => handleCopy(t.text, i)}>
                        {copied === i ? <Check color="success" fontSize="small" /> : <ContentCopy fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{t.text}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Tips */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Community Engagement Tips</Typography>
              {engagementTips.map((tip, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5, p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', '&:hover': { borderColor: 'primary.light', background: 'rgba(108,92,231,0.04)' }, transition: 'all 0.15s' }}>
                  <Typography sx={{ fontSize: 20, flexShrink: 0 }}>{tip.icon}</Typography>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>{tip.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{tip.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
