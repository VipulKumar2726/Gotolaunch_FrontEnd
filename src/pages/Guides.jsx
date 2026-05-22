import React, { useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import GuideCard from '../components/GuideCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import EmptyState from '../components/EmptyState'
import { guidesData, guideCategories } from '../data/guides'

export default function Guides() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = guidesData.filter((g) => {
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.desc.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || g.category === filter
    return matchSearch && matchFilter
  })

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Launch Guides</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>Learn from 100+ battle-tested launch strategies</Typography>
      </Box>
      <SearchBar value={search} onChange={setSearch} placeholder="Search guides..." />
      <FilterBar options={guideCategories} active={filter} onChange={setFilter} />
      {filtered.length > 0 ? (
        <Grid container spacing={2}>
          {filtered.map((g) => (
            <Grid item xs={12} sm={6} md={4} key={g.id}><GuideCard guide={g} /></Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState icon="🔍" title="No guides found" description="Try a different search term or category filter." action={() => { setSearch(''); setFilter('all') }} actionLabel="Clear Filters" />
      )}
    </Box>
  )
}
