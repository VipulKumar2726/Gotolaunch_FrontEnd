import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

export default function StatCard({ title, value, subtitle, icon, trend, trendValue, color, loading, gradient }) {
  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" height={48} />
          <Skeleton variant="text" width="50%" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{
      height: '100%',
      background: gradient || 'background.paper',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Box sx={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100, borderRadius: '50%',
        background: `${color || '#6C5CE7'}18`,
      }} />
      <CardContent sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <Box sx={{
            width: 40, height: 40, borderRadius: 2,
            background: `${color || '#6C5CE7'}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: color || 'primary.main',
          }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {trend && (
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.25,
              color: trend === 'up' ? 'success.main' : 'error.main',
              fontSize: 13, fontWeight: 600,
            }}>
              {trend === 'up' ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
              {trendValue}
            </Box>
          )}
          {subtitle && (
            <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
