import {
  Grid, Card, CardContent, Typography, Box, Button, Chip,
  LinearProgress, Avatar, Accordion, AccordionSummary, AccordionDetails,
  Checkbox, FormControlLabel, IconButton, Tooltip,
} from '@mui/material'
import { Campaign, ExpandMore, ContentCopy, Check } from '@mui/icons-material'
import { useState } from 'react'
import { promotionPlatforms } from '../data/dummyData'
import PageHeader from '../components/PageHeader'
import ScoreCircle from '../components/ScoreCircle'

export default function Promotion() {
  const [copied, setCopied] = useState(null)
  const [expanded, setExpanded] = useState('panel0')

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const overallScore = Math.round(promotionPlatforms.reduce((s, p) => s + p.score, 0) / promotionPlatforms.length)

  return (
    <Box>
      <PageHeader
        title="Promotion Guidance"
        subtitle="Multi-platform promotion strategy with ready-to-use templates"
        icon={<Campaign />}
        breadcrumb
      />

      <Grid container spacing={2.5}>
        {/* Score Overview */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Promotion Score</Typography>
              <ScoreCircle score={overallScore} size={140} color="#6C5CE7" label="Overall Readiness" />
              <Box sx={{ mt: 3 }}>
                {promotionPlatforms.map((p, i) => (
                  <Box key={i} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={600}>{p.name}</Typography>
                      <Typography variant="caption" color="primary" fontWeight={700}>{p.score}</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={p.score} sx={{ height: 6, borderRadius: 4 }}
                      color={p.score >= 85 ? 'success' : p.score >= 70 ? 'primary' : 'warning'} />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Platform Details */}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          {promotionPlatforms.map((platform, i) => (
            <Accordion
              key={i}
              expanded={expanded === `panel${i}`}
              onChange={() => setExpanded(expanded === `panel${i}` ? '' : `panel${i}`)}
              sx={{ mb: 1.5, borderRadius: '16px !important', border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2.5, py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Avatar sx={{ width: 38, height: 38, background: platform.color + '22', color: platform.color, fontWeight: 700, fontSize: 14 }}>
                    {platform.name[0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={700}>{platform.name}</Typography>
                    <Typography variant="caption" color="text.secondary">Best time: {platform.bestTime}</Typography>
                  </Box>
                  <Chip label={`Score: ${platform.score}`} size="small" color={platform.score >= 85 ? 'success' : platform.score >= 70 ? 'primary' : 'warning'} sx={{ fontWeight: 700, mr: 1 }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>✅ Launch Checklist</Typography>
                    {platform.checklist.map((item, j) => (
                      <FormControlLabel
                        key={j}
                        control={<Checkbox size="small" defaultChecked={false} />}
                        label={<Typography variant="body2">{item}</Typography>}
                        sx={{ display: 'flex', mb: 0.5 }}
                      />
                    ))}
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>📝 CTA Template</Typography>
                    <Box sx={{ p: 2, borderRadius: 2, background: 'rgba(108,92,231,0.06)', border: '1px solid rgba(108,92,231,0.12)', position: 'relative' }}>
                      <Typography variant="body2" sx={{ pr: 4, lineHeight: 1.7 }}>{platform.template}</Typography>
                      <Tooltip title={copied === i ? 'Copied!' : 'Copy template'}>
                        <IconButton
                          size="small"
                          onClick={() => handleCopy(platform.template, i)}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          {copied === i ? <Check color="success" fontSize="small" /> : <ContentCopy fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
