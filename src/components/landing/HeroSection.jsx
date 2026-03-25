import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Box sx={{ bgcolor: 'linear-gradient(180deg, #F3F7FF 0%, #FFFFFF 100%)', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: { xs: 'left', md: 'center' }, maxWidth: 900, mx: { md: 'auto' } }}>
            <Typography component="h1" variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Plan Your Product Hunt Launch The Right Way
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              GoToLaunch helps founders organize, execute, and win their Product Hunt launch without chaos.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ md: 'center' }}>
              <Button component={RouterLink} to="/register" variant="contained" size="large">
                Get Started
              </Button>
              <Button component="a" href="#pricing" variant="outlined" size="large">
                View Pricing
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;
