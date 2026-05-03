import {
  Grid, Card, CardContent, Typography, Box, Chip, LinearProgress,
  Avatar,
} from '@mui/material'
import { People } from '@mui/icons-material'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { personas, audienceSegments } from '../data/dummyData'
import PageHeader from '../components/PageHeader'

const COLORS = ['#6C5CE7', '#00CEC9', '#FDCB6E', '#E17055', '#A29BFE']

export default function AudienceTargeting() {
  return (
    <Box>
      <PageHeader
        title="Audience & Persona Targeting"
        subtitle="Understand who to target and how to message them"
        icon={<People />}
        breadcrumb
      />

      <Grid container spacing={2.5}>
        {/* Persona Cards */}
        {personas.map((p, i) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Avatar sx={{ width: 44, height: 44, background: COLORS[i % COLORS.length] + '20', color: COLORS[i % COLORS.length], fontWeight: 700, fontSize: 20 }}>
                    {['🧑‍💻', '👩‍💼', '🤖', '📈'][i]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>{p.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{p.role}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.75, mb: 2 }}>
                  <Chip label={p.segment} size="small" sx={{ fontWeight: 700, background: COLORS[i % COLORS.length] + '15', color: COLORS[i % COLORS.length] }} />
                </Box>

                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>PAIN POINTS</Typography>
                {p.painPoints.map((pt, j) => (
                  <Box key={j} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, mb: 0.5 }}>
                    <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: '#E17055', mt: 0.75, flexShrink: 0 }} />
                    <Typography variant="caption">{pt}</Typography>
                  </Box>
                ))}

                <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, background: 'rgba(108,92,231,0.06)', border: '1px dashed rgba(108,92,231,0.2)' }}>
                  <Typography variant="caption" fontWeight={700} color="primary" sx={{ display: 'block', mb: 0.5 }}>💬 MESSAGING</Typography>
                  <Typography variant="caption">{p.messaging}</Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" fontWeight={600}>Audience Fit</Typography>
                    <Typography variant="caption" fontWeight={700} color={p.fitScore >= 90 ? 'success.main' : 'primary.main'}>{p.fitScore}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={p.fitScore} sx={{ height: 7, borderRadius: 4 }} color={p.fitScore >= 90 ? 'success' : 'primary'} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Segmentation Chart */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>Audience Segmentation</Typography>
              <Typography variant="caption" color="text.secondary">Distribution of your target audience</Typography>
              <Box sx={{ height: 280, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={audienceSegments} cx="50%" cy="50%" outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, value }) => `${value}%`}>
                      {audienceSegments.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: 12, border: 'none' }} />
                    <Legend iconType="circle" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Messaging by Segment */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Segment Messaging Guide</Typography>
              {audienceSegments.map((seg, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={700}>{seg.label}</Typography>
                      <Typography variant="caption" fontWeight={700} sx={{ color: seg.color }}>{seg.value}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={seg.value} sx={{ height: 6, borderRadius: 4, '& .MuiLinearProgress-bar': { background: seg.color } }} />
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
