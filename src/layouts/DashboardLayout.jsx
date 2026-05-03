import { Box, Toolbar, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar, { DRAWER_WIDTH } from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout({ children, darkMode, onToggleDark }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar – permanent on desktop, drawer on mobile */}
      {isMobile ? (
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} mobile />
      ) : (
        <Sidebar open />
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          darkMode={darkMode}
          onToggleDark={onToggleDark}
          onMenuOpen={() => setMobileOpen(true)}
        />
        <Toolbar /> {/* spacer */}
        <Box
          component="main"
          data-testid="dashboard-content"
          data-locator="main-content-area"
          sx={{
            flex: 1,
            p: { xs: 2, md: 3.5 },
            background: 'background.default',
            minHeight: '100vh',
            overflow: 'auto',
          }}
        >
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  )
}
