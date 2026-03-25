import React from 'react';
import { Box, Container } from '@mui/material';

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        padding: '20px',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '40px 32px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
