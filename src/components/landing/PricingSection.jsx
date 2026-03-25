import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';

const plans = [
  {
    id: 'starter',
    title: 'Starter',
    price: '$29',
    subtitle: 'per launch',
    features: ['Full launch planning', 'Checklist automation', 'Launch day mode', 'Email reminders'],
    featured: false,
  },
  {
    id: 'pro',
    title: 'Pro',
    price: '$49',
    subtitle: 'per launch',
    features: ['Everything in Starter', 'Priority support', 'Future AI features'],
    featured: true,
  },
];

const PricingSection = () => {
  return (
    <Box id="pricing" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Pricing
      </Typography>

      <Grid container spacing={3}>
        {plans.map((p) => (
          <Grid item xs={12} md={6} key={p.id}>
            <Card elevation={p.featured ? 8 : 2} sx={{ border: p.featured ? '2px solid rgba(25,118,210,0.12)' : 'none', position: 'relative' }}>
              {p.featured && <Chip label="Most Popular" color="primary" sx={{ position: 'absolute', top: 16, right: 16 }} />}
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{p.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>{p.price}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>{p.subtitle}</Typography>

                <Box sx={{ mb: 2 }}>
                  {p.features.map((f) => (
                    <Typography key={f} color="text.secondary">• {f}</Typography>
                  ))}
                </Box>

                <Button variant={p.featured ? 'contained' : 'outlined'} color="primary" size="large" href="/register">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingSection;
