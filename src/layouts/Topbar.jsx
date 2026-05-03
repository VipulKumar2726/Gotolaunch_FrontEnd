import {
  AppBar, Toolbar, IconButton, InputBase, Box, Badge,
  Avatar, Tooltip, Menu, MenuItem, Typography, Divider, Switch,
  ListItemIcon, useMediaQuery,
} from '@mui/material'
import {
  Search, Notifications, Menu as MenuIcon, DarkMode, LightMode,
  Person, Settings, Logout, Help,
} from '@mui/icons-material'
import { useState } from 'react'
import { DRAWER_WIDTH } from './Sidebar'
import { notifications } from '../data/dummyData'

export default function Topbar({ darkMode, onToggleDark, onMenuOpen }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifAnchor, setNotifAnchor] = useState(null)
  const isMobile = useMediaQuery('(max-width:768px)')
  const unread = notifications.filter(n => !n.read).length

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        background: theme => theme.palette.mode === 'dark'
          ? 'rgba(26,25,40,0.92)'
          : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: theme => `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {/* Mobile menu button */}
        <IconButton onClick={onMenuOpen} sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        {/* Search */}
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          background: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(108,92,231,0.06)',
          border: '1px solid', borderColor: 'divider',
          borderRadius: 2, px: 2, py: 0.75, flex: 1, maxWidth: 400,
        }}>
          <Search sx={{ fontSize: 18, color: 'text.secondary' }} />
          <InputBase placeholder="Search products, strategies…" sx={{ flex: 1, fontSize: 14 }} />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Dark mode toggle */}
        <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
          <IconButton onClick={onToggleDark} size="small">
            {darkMode ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton size="small" onClick={e => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={unread} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10 } }}>
              <Notifications sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Avatar */}
        <Tooltip title="Account">
          <Avatar
            onClick={e => setAnchorEl(e.currentTarget)}
            sx={{
              width: 34, height: 34, cursor: 'pointer',
              background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
              fontSize: 13, fontWeight: 700,
            }}
          >
            AJ
          </Avatar>
        </Tooltip>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notifAnchor} open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          PaperProps={{ sx: { width: 340, maxHeight: 400, borderRadius: 3 } }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight={700}>Notifications</Typography>
          </Box>
          {notifications.map(n => (
            <MenuItem key={n.id} sx={{ py: 1.5, opacity: n.read ? 0.7 : 1 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {!n.read && <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#6C5CE7', flexShrink: 0 }} />}
                  <Typography variant="body2" fontWeight={n.read ? 400 : 600}>{n.title}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">{n.desc}</Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>{n.time}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl} open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { width: 220, borderRadius: 3, mt: 1 } }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>Alex Johnson</Typography>
            <Typography variant="caption" color="text.secondary">alex@startup.io</Typography>
          </Box>
          <Divider />
          <MenuItem><ListItemIcon><Person fontSize="small" /></ListItemIcon>Profile</MenuItem>
          <MenuItem><ListItemIcon><Settings fontSize="small" /></ListItemIcon>Settings</MenuItem>
          <MenuItem><ListItemIcon><Help fontSize="small" /></ListItemIcon>Help & Support</MenuItem>
          <Divider />
          <MenuItem sx={{ color: 'error.main' }}><ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
