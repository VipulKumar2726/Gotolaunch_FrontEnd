import React from 'react'
import { Box, Button } from '@mui/material'

export default function FilterBar({ options, active, onChange }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
      {options.map((opt) => (
        <Button
          key={opt}
          size="small"
          variant={active === opt || (opt === 'All' && active === 'all') ? 'contained' : 'outlined'}
          onClick={() => onChange(opt === 'All' ? 'all' : opt)}
          sx={{ borderRadius: 20, fontSize: 12.5, px: 1.75, py: 0.5 }}
        >
          {opt}
        </Button>
      ))}
    </Box>
  )
}
