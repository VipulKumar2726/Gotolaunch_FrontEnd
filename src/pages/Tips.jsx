import React, { useState } from 'react'
import { Box, Typography, Grid, Paper, Chip, Button, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ShareIcon from '@mui/icons-material/Share'
import { tipsData } from '../data/tips'
import { useApp } from '../context/AuthContext'

export default function Tips() {
  const { showNotification } = useApp()
  const [saved, setSaved] = useState([])

  const toggleSave = (id) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
    showNotification('Tip saved!')
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Launch Tips Feed</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>Daily wisdom from founders who've been there</Typography>
      </Box>
      <Grid container spacing={2}>
        {tipsData.map((t, i) => (
          <Grid item xs={12} sm={6} key={t.id}>
            <Paper elevation={0} sx={{
              p: 2.5, border: '1px solid', borderColor: 'divider', borderRadius: 3,
              borderLeft: '3px solid', borderLeftColor: 'primary.main', position: 'relative',
              transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px rgba(91,74,247,0.1)', transform: 'translateX(3px)' },
            }}>
              <Typography sx={{ fontFamily: "'Syne',sans-serif", fontSize: 52, fontWeight: 800, color: 'primary.main', opacity: 0.08, position: 'absolute', right: 16, top: 8, lineHeight: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography sx={{ fontSize: 24 }}>{t.icon}</Typography>
                <Chip label={t.trending ? '🔥 Trending' : t.category} size="small" color={t.trending ? 'error' : 'primary'} variant="outlined" sx={{ fontSize: 11, height: 22 }} />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.65, mb: 2 }}>{t.tip}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="outlined" startIcon={saved.includes(t.id) ? <BookmarkIcon sx={{ fontSize: 14 }} /> : <BookmarkBorderIcon sx={{ fontSize: 14 }} />}
                  onClick={() => toggleSave(t.id)} sx={{ borderRadius: 2, fontSize: 12.5, color: saved.includes(t.id) ? 'primary.main' : 'text.secondary' }}>
                  {saved.includes(t.id) ? 'Saved' : 'Save Tip'}
                </Button>
                <Button size="small" variant="outlined" startIcon={<ShareIcon sx={{ fontSize: 14 }} />} sx={{ borderRadius: 2, fontSize: 12.5, color: 'text.secondary' }}>
                  Share
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
