import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <TextField
      fullWidth size="small" value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
      }}
      sx={{ '& .MuiOutlinedInput-root': { fontSize: 14, borderRadius: 2, bgcolor: 'background.paper' } }}
    />
  )
}
