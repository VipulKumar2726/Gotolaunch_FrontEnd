import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import PricingSection from '../components/landing/PricingSection';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <HeroSection />
        <Container maxWidth="lg">
          <FeaturesSection />
          <HowItWorks />
          <PricingSection />
          <Testimonials />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
