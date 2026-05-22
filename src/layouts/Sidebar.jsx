import {
  Drawer, Box, Typography, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Avatar, Divider, Tooltip, IconButton, Chip,
} from '@mui/material'
import {
  Dashboard, Rocket, Campaign, StarRate, Article, People,
  Hub, CalendarMonth, Forum, TrendingUp, Settings, ChevronLeft,
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import ArticleIcon from '@mui/icons-material/Article'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'




export const DRAWER_WIDTH = 260

const navItems = [
  { path: '/app', label: 'Dashboard', icon: <Dashboard /> },
  { path: '/app/launches', label: 'Launches', icon: <Rocket /> },
  { path: '/app/strategy', label: 'Launch Strategy', icon: <Campaign /> },
  { path: '/app/guides',  label: 'Launch Guides',icon: <MenuBookIcon fontSize="small" /> },
  { path: '/app/tips', label: 'Launch Tips', icon: <TipsAndUpdatesIcon fontSize="small" /> },
  { path: '/app/templates', label: 'Templates', icon: <ArticleIcon fontSize="small" /> },
  { path: '/app/advisor', label: 'AI Advisor', icon: <AutoAwesomeIcon fontSize="small" /> },
  { path: '/app/promotion', label: 'Promotion', icon: <StarRate /> },
  { path: '/app/readiness', label: 'Readiness Score', icon: <Article /> },
  { path: '/app/content', label: 'Content & Copy', icon: <People /> },
  { path: '/app/audience', label: 'Audience Targeting', icon: <Hub /> },
  { path: '/app/distribution', label: 'Distribution', icon: <CalendarMonth /> },
  { path: '/app/timeline', label: 'Launch Timeline', icon: <Forum /> },
  { path: '/app/engagement', label: 'Engagement', icon: <TrendingUp /> },
  { path: '/app/growth', label: 'Post-Launch Growth', icon: <StarRate /> },
]

export default function Sidebar({ open, onClose, mobile }) {
  const location = useLocation()
  const navigate = useNavigate()

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{
          width: 38, height: 38, borderRadius: 2,
          background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(108,92,231,0.35)',
          fontSize: 20,
        }}>
          🚀
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1 }}>GoToLaunch</Typography>
          <Typography variant="caption" color="text.secondary">Launch Intelligence</Typography>
        </Box>
        {mobile && (
          <IconButton onClick={onClose} sx={{ ml: 'auto' }}><ChevronLeft /></IconButton>
        )}
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Pro Badge */}
      <Box sx={{ mx: 2, mt: 2, p: 1.5, borderRadius: 2, background: 'linear-gradient(135deg, rgba(108,92,231,0.1), rgba(162,155,254,0.1))', border: '1px solid rgba(108,92,231,0.15)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" fontWeight={600} color="primary">FREE PLAN</Typography>
          <Chip label="Upgrade" size="small" color="primary" sx={{ fontSize: 10, height: 20 }} />
        </Box>
        <Typography variant="caption" color="text.secondary">2/3 products used</Typography>
        <Box sx={{ mt: 0.75, height: 4, borderRadius: 4, background: 'rgba(108,92,231,0.15)' }}>
          <Box sx={{ width: '66%', height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
        </Box>
      </Box>

      {/* Nav Items */}
      <List sx={{ flex: 1, px: 1.5, pt: 2 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path)
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                data-locator={item.path}
                onClick={() => { navigate(item.path); if (mobile) onClose() }}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 1.5,
                  background: active ? 'linear-gradient(135deg, rgba(108,92,231,0.12), rgba(162,155,254,0.08))' : 'transparent',
                  border: active ? '1px solid rgba(108,92,231,0.15)' : '1px solid transparent',
                  '&:hover': { background: 'rgba(108,92,231,0.07)', border: '1px solid rgba(108,92,231,0.1)' },
                  transition: 'all 0.15s ease',
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 36,
                  color: active ? 'primary.main' : 'text.secondary',
                  '& .MuiSvgIcon-root': { fontSize: 20 },
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    color: active ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Settings + User */}
      <List sx={{ px: 1.5, pb: 1 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => { navigate('/app/settings'); if (mobile) onClose() }}
            sx={{ borderRadius: 2, py: 1, px: 1.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
              <Settings sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
      </List>

      {/* User Profile */}
      <Box sx={{ p: 2, mx: 1.5, mb: 1, borderRadius: 2, background: 'rgba(108,92,231,0.06)', cursor: 'pointer', '&:hover': { background: 'rgba(108,92,231,0.1)' }, transition: 'background 0.15s' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 34, height: 34, background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', fontSize: 14, fontWeight: 700 }}>
            AJ
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={700} noWrap>Alex Johnson</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>alex@startup.io</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  if (mobile) {
    return (
      <Drawer open={open} onClose={onClose} sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}>
        {drawerContent}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}
