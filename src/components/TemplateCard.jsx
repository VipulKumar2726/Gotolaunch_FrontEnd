import React, { useState } from 'react'
import { Card, CardContent, Box, Typography, Chip, Button, IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CheckIcon from '@mui/icons-material/Check'
import { useApp } from '../context/AuthContext'

export default function TemplateCard({ template }) {
  const { savedTemplates, toggleSavedTemplate, showNotification } = useApp()
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const saved = savedTemplates.includes(template.id)

  const handleCopy = () => {
    navigator.clipboard.writeText(template.preview).catch(() => {})
    setCopied(true)
    showNotification('Template copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card elevation={0} sx={{ transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 32px rgba(91,74,247,0.1)', transform: 'translateY(-1px)' } }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 22 }}>{template.icon}</Typography>
            <Box>
              <Typography variant="h6" sx={{ fontSize: 14.5, fontWeight: 700 }}>{template.title}</Typography>
              <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>{template.category}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.25 }}>
            <IconButton size="small" onClick={() => setLiked(!liked)}>
              {liked ? <FavoriteIcon sx={{ fontSize: 16, color: '#ec4899' }} /> : <FavoriteBorderIcon sx={{ fontSize: 16 }} />}
            </IconButton>
            <IconButton size="small" onClick={() => toggleSavedTemplate(template.id)}>
              {saved ? <BookmarkIcon sx={{ fontSize: 16 }} color="primary" /> : <BookmarkBorderIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
          {template.tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" color="primary" sx={{ fontSize: 10, height: 20 }} />
          ))}
        </Box>
        <Box sx={{
          bgcolor: 'background.default', borderRadius: 2, p: 1.5,
          fontSize: 12, color: 'text.secondary', lineHeight: 1.7,
          maxHeight: 90, overflow: 'hidden', position: 'relative', mb: 2,
          whiteSpace: 'pre-line',
          '&::after': {
            content: '""', position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 28, background: 'linear-gradient(to bottom, transparent, var(--bg))',
          },
        }}>
          {template.preview}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained" size="small" sx={{ flex: 1, borderRadius: 2, fontSize: 12.5 }}
            startIcon={copied ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
            onClick={handleCopy}
            color={copied ? 'success' : 'primary'}
          >
            {copied ? 'Copied!' : 'Copy Template'}
          </Button>
          <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontSize: 12.5 }} onClick={() => toggleSavedTemplate(template.id)}>
            {saved ? '🔖 Saved' : '🔖 Save'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
