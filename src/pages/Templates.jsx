import React, { useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import TemplateCard from '../components/TemplateCard'
import SearchBar from '../components/SearchBar'
import { templatesData } from '../data/templates.js'

export default function Templates() {
  const [search, setSearch] = useState('')

  const filtered = templatesData.filter((t) =>
    !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()) || t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Template Library</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>Copy-paste ready templates for every launch channel</Typography>
      </Box>
      <SearchBar value={search} onChange={setSearch} placeholder="Search templates by name, category, or tag..." />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {filtered.map((t) => (
            <Grid item xs={12} sm={6} key={t.id}><TemplateCard template={t} /></Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
