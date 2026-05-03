import { Box, Typography, Button, Card } from '@mui/material'
import { RocketLaunch, Close } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UpgradeBanner({ title = 'Unlock Premium Features', subtitle = 'Get AI recommendations, unlimited products, and priority support.' }) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  const navigate = useNavigate()
  return (
    <Card sx={{
      background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #00CEC9 100%)',
      color: '#fff', mb: 3, position: 'relative', overflow: 'hidden',
    }}>
      <Box sx={{
        position: 'absolute', top: -30, right: -30,
        width: 140, height: 140, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
      }} />
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <RocketLaunch sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight={700}>{title}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.88 }}>{subtitle}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button variant="contained"  onClick={() => navigate('/pricing')} sx={{
            background: '#fff', color: '#6C5CE7',
            '&:hover': { background: 'rgba(255,255,255,0.9)' },
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}>
            Upgrade to Pro
          </Button>
          <Button onClick={() => setVisible(false)} sx={{ color: '#fff', minWidth: 0, p: 1 }}>
            <Close />
          </Button>
        </Box>
      </Box>
    </Card>
  )
}
