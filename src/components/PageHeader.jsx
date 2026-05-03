import { Box, Typography, Breadcrumbs, Link } from '@mui/material'

export default function PageHeader({ title, subtitle, icon, action, breadcrumb }) {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumb && (
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link underline="hover" color="text.secondary" href="/" sx={{ fontSize: 13 }}>Dashboard</Link>
          <Typography color="text.primary" sx={{ fontSize: 13, fontWeight: 600 }}>{title}</Typography>
        </Breadcrumbs>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {icon && (
            <Box sx={{
              width: 48, height: 48, borderRadius: 3,
              background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', boxShadow: '0 4px 16px rgba(108,92,231,0.3)',
            }}>
              {icon}
            </Box>
          )}
          <Box>
            <Typography variant="h4" fontWeight={700}>{title}</Typography>
            {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>{subtitle}</Typography>}
          </Box>
        </Box>
        {action && <Box>{action}</Box>}
      </Box>
    </Box>
  )
}
