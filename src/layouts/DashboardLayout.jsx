import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import TopNavbar from '../components/TopNavbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar (Desktop or Mobile) */}
      <Sidebar open={sidebarOpen || !isMobile} onClose={handleSidebarClose} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopNavbar onMenuClick={handleSidebarOpen} />

        {/* Content Area */}
        <Box
          component="main"
          sx={{
            flex: 1,
            paddingTop: '80px',
            paddingLeft: { xs: '16px', sm: '24px', md: '32px' },
            paddingRight: { xs: '16px', sm: '24px', md: '32px' },
            paddingBottom: '32px',
            backgroundColor: '#F5F5F5',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
