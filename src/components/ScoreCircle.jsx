import { Box, Typography } from '@mui/material'

export default function ScoreCircle({ score, size = 120, strokeWidth = 10, color = '#6C5CE7', label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = ((100 - score) / 100) * circumference

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(108,92,231,0.12)" strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={progress}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <Box sx={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography variant="h5" fontWeight={700} sx={{ color }}>
            {score}
          </Typography>
          <Typography variant="caption" color="text.secondary">/100</Typography>
        </Box>
      </Box>
      {label && (
        <Typography variant="body2" fontWeight={600} color="text.secondary" align="center">
          {label}
        </Typography>
      )}
    </Box>
  )
}
