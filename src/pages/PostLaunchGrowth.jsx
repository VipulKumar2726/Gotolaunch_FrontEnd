import {
  Grid, Card, CardContent, Typography, Box, Chip, Button,
  LinearProgress, Checkbox, FormControlLabel,
} from '@mui/material'
import { TrendingUp, Email, CheckBox, ArrowUpward } from '@mui/icons-material'
import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts'
import { emailSequences, growthKPIs, growthOpportunities } from '../data/dummyData'
import PageHeader from '../components/PageHeader'
import StatusChip from '../components/StatusChip'
import UpgradeBanner from '../components/UpgradeBanner'

const retentionChecklist = [
  'Send thank you email to all upvoters',
  'Create an onboarding email sequence',
  'Set up a user feedback survey (Typeform)',
  'Add users to a private Slack/Discord',
  'Schedule a live Q&A or demo session',
  'Create a product changelog page',
]

export default function PostLaunchGrowth() {
  const [checked, setChecked] = useState([])
  const toggle = (i) => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i])

  return (
    <Box>
      <PageHeader
        title="Post-Launch Growth Plan"
        subtitle="Turn your Product Hunt momentum into lasting growth"
        icon={<TrendingUp />}
        breadcrumb
        action={<Button variant="contained" startIcon={<ArrowUpward />} size="small">Download 30-Day Plan</Button>}
      />
      <UpgradeBanner title="Unlock Growth Autopilot" subtitle="Auto-send follow-up sequences, track retention, and get weekly AI growth reports." />

      <Grid container spacing={2.5}>
        {/* KPI Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>Post-Launch Growth Metrics</Typography>
              <Typography variant="caption" color="text.secondary">MRR & User growth over 6 weeks</Typography>
              <Box sx={{ height: 260, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthKPIs} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,92,231,0.08)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" iconSize={8} />
                    <Line yAxisId="left" type="monotone" dataKey="mrr" stroke="#6C5CE7" strokeWidth={2.5} dot={false} name="MRR ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="users" stroke="#00CEC9" strokeWidth={2.5} dot={false} name="Users" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Retention Checklist */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>User Retention Checklist</Typography>
              <Typography variant="caption" color="text.secondary">{checked.length}/{retentionChecklist.length} completed</Typography>
              <LinearProgress variant="determinate" value={(checked.length / retentionChecklist.length) * 100} sx={{ my: 2, height: 8 }} color="success" />
              {retentionChecklist.map((item, i) => (
                <FormControlLabel
                  key={i}
                  control={<Checkbox size="small" checked={checked.includes(i)} onChange={() => toggle(i)} />}
                  label={<Typography variant="body2" sx={{ textDecoration: checked.includes(i) ? 'line-through' : 'none', opacity: checked.includes(i) ? 0.55 : 1 }}>{item}</Typography>}
                  sx={{ display: 'flex', mb: 0.75 }}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Email Sequences */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Email color="primary" />
                <Typography variant="h6" fontWeight={700}>Email Follow-Up Sequences</Typography>
              </Box>
              {emailSequences.map((e, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, mb: 1.5, p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 2, background: 'rgba(108,92,231,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Typography variant="caption" fontWeight={800} color="primary">D+{e.day}</Typography>
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={700} noWrap>{e.subject}</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>{e.preview}</Typography>
                  </Box>
                  <StatusChip status={e.status} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Growth Opportunities */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Growth Opportunities</Typography>
              {growthOpportunities.map((opp, i) => (
                <Box key={i} sx={{ mb: 2, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', '&:hover': { borderColor: 'primary.light', boxShadow: 1 }, transition: 'all 0.15s' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography variant="subtitle2" fontWeight={700}>{opp.title}</Typography>
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                      <Chip label={`Potential: ${opp.potential}`} size="small" color={opp.potential === 'High' ? 'success' : 'warning'} sx={{ fontWeight: 700 }} />
                      <Chip label={`Effort: ${opp.effort}`} size="small" sx={{ fontWeight: 700 }} />
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">{opp.desc}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
