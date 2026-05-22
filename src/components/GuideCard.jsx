import React from 'react'
import { Card, CardContent, Box, Typography, Chip, Button, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useApp } from '../context/AuthContext'

const diffColors = { Beginner: 'success', Medium: 'warning', Advanced: 'error' }

export default function GuideCard({ guide }) {
  const { savedGuides, toggleSavedGuide } = useApp()
  const saved = savedGuides.includes(guide.id)

  return (
    <Card elevation={0} sx={{ transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px rgba(91,74,247,0.14)', transform: 'translateY(-2px)' } }}>
      <Box sx={{
        height: 130, bgcolor: guide.color, display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: 44, position: 'relative',
      }}>
        {guide.emoji}
        <IconButton
          size="small"
          onClick={() => toggleSavedGuide(guide.id)}
          sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#fff' } }}
        >
          {saved ? <BookmarkIcon fontSize="small" color="primary" /> : <BookmarkBorderIcon fontSize="small" />}
        </IconButton>
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Chip label={guide.diff} color={diffColors[guide.diff]} size="small" sx={{ mb: 1, fontSize: 11, height: 22 }} />
        <Typography variant="h6" sx={{ fontSize: 14.5, fontWeight: 700, mb: 0.75, lineHeight: 1.4 }}>
          {guide.title}
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.6, mb: 1.5 }}>
          {guide.desc}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
          <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>{guide.time}</Typography>
          <Chip label={guide.category} size="small" variant="outlined" color="primary" sx={{ fontSize: 10, height: 20, ml: 'auto' }} />
        </Box>
        <Button variant="outlined" size="small" fullWidth sx={{ borderRadius: 2, fontSize: 12.5 }}>
          Read Guide →
        </Button>
      </CardContent>
    </Card>
  )
}
