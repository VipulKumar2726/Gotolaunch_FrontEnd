import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          GoToLaunch
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ flex: 1, padding: '16px 0' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                backgroundColor:
                  location.pathname === item.path
                    ? 'rgba(25, 118, 210, 0.1)'
                    : 'transparent',
                borderLeft:
                  location.pathname === item.path
                    ? '4px solid #1976D2'
                    : '4px solid transparent',
                paddingLeft: '16px',
                margin: '8px 0',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? '#1976D2'
                      : 'rgba(0, 0, 0, 0.6)',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight:
                      location.pathname === item.path ? 600 : 500,
                    color:
                      location.pathname === item.path
                        ? '#1976D2'
                        : 'rgba(0, 0, 0, 0.87)',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      <Box sx={{ padding: '16px' }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#F44336', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#F44336',
                fontWeight: 600,
              },
            }}
          />
        </ListItem>
      </Box>
    </>
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E0E0E0',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {sidebarContent}
      </Box>
    </Drawer>
  ) : (
    <Box
      sx={{
        width: 280,
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
