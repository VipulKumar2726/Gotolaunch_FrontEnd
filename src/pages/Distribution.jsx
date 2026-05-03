import {
  Grid, Card, CardContent, Typography, Box, Button, Chip, IconButton,
  TextField, InputAdornment, ToggleButton, ToggleButtonGroup,
  LinearProgress, Tooltip,
} from '@mui/material'
import { Hub, Search, Bookmark, BookmarkBorder, FilterList } from '@mui/icons-material'
import { useState } from 'react'
import { channels } from '../data/dummyData'
import PageHeader from '../components/PageHeader'

const authorityColor = (score) => score >= 90 ? '#00B894' : score >= 80 ? '#6C5CE7' : score >= 70 ? '#FDCB6E' : '#E17055'

export default function Distribution() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [saved, setSaved] = useState(channels.filter(c => c.saved).map(c => c.id))

  const types = ['All', 'Platform', 'Community', 'Directory']
  const filtered = channels.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.niche.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || c.type === filter
    return matchSearch && matchFilter
  })

  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  return (
    <Box>
      <PageHeader
        title="Distribution Channels"
        subtitle="Curated list of communities, directories, and platforms for your launch"
        icon={<Hub />}
        breadcrumb
      />

      {/* Filters */}
      <Card sx={{ mb: 2.5 }}>
        <CardContent sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', py: '12px !important' }}>
          <TextField
            size="small"
            placeholder="Search channels…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
            sx={{ minWidth: 240 }}
          />
          <ToggleButtonGroup size="small" value={filter} exclusive onChange={(_, v) => v && setFilter(v)}>
            {types.map(t => <ToggleButton key={t} value={t} sx={{ fontWeight: 600, px: 2 }}>{t}</ToggleButton>)}
          </ToggleButtonGroup>
          <Box sx={{ ml: 'auto' }}>
            <Chip label={`${saved.length} Saved`} icon={<Bookmark sx={{ fontSize: 14 }} />} color="primary" size="small" sx={{ fontWeight: 700 }} />
          </Box>
        </CardContent>
      </Card>

      {/* Channel Grid */}
      <Grid container spacing={2}>
        {filtered.map((ch) => {
          const isSaved = saved.includes(ch.id)
          return (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={ch.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>{ch.name}</Typography>
                      <Box sx={{ display: 'flex', gap: 0.75, mt: 0.75, flexWrap: 'wrap' }}>
                        <Chip label={ch.type} size="small" sx={{ fontSize: 11, fontWeight: 600, height: 20 }} />
                        <Chip label={ch.niche} size="small" variant="outlined" sx={{ fontSize: 11, fontWeight: 600, height: 20 }} />
                      </Box>
                    </Box>
                    <IconButton size="small" onClick={() => toggleSave(ch.id)} color={isSaved ? 'primary' : 'default'}>
                      {isSaved ? <Bookmark /> : <BookmarkBorder />}
                    </IconButton>
                  </Box>

                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                    👥 {ch.members} members
                  </Typography>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={600}>Authority Score</Typography>
                      <Typography variant="caption" fontWeight={800} sx={{ color: authorityColor(ch.authority) }}>
                        {ch.authority}/100
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate" value={ch.authority}
                      sx={{ height: 7, borderRadius: 4, '& .MuiLinearProgress-bar': { background: authorityColor(ch.authority) } }}
                    />
                  </Box>

                  <Button size="small" fullWidth variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
                    View Channel →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
