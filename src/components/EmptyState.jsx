import React from 'react'
import { Box, Typography, Button } from '@mui/material'

export default function EmptyState({ icon = '🔍', title = 'Nothing found', description = '', action, actionLabel }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
      <Typography sx={{ fontSize: 52, mb: 2, opacity: 0.5 }}>{icon}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
      {description && (
        <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 3, maxWidth: 340, mx: 'auto' }}>
          {description}
        </Typography>
      )}
      {action && (
        <Button variant="contained" onClick={action}>{actionLabel}</Button>
      )}
    </Box>
  )
}
