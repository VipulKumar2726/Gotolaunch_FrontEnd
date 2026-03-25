import React from 'react';
import { Box, Container, Typography, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: '#fff', py: 6, mt: 6 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              GoToLaunch
            </Typography>
            <Typography color="grey.300" sx={{ maxWidth: 360, mt: 1 }}>
              Plan, execute and track your Product Hunt launch with confidence.
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Links</Typography>
            <Stack>
              <Link component={RouterLink} to="/login" sx={{ color: 'grey.300', textDecoration: 'none' }}>Login</Link>
              <Link component={RouterLink} to="/register" sx={{ color: 'grey.300', textDecoration: 'none' }}>Register</Link>
              <Link href="#pricing" sx={{ color: 'grey.300', textDecoration: 'none' }}>Pricing</Link>
            </Stack>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ mt: 4, color: 'grey.500' }}>
          © 2026 GoToLaunch. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
