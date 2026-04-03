import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'basic',
    title: 'Basic',
    price: '$0',
    subtitle: 'Free',
    features: [
      'Up to 3 launches',
      'Basic checklist',
      'Limited support'
    ],
    featured: false,
  },
  {
    id: 'standard',
    title: 'Standard',
    price: '$29',
    subtitle: 'per launch',
    features: [
      'Unlimited launches',
      'Checklist automation',
      'Launch day mode',
      'Email reminders'
    ],
    featured: true,
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '$49',
    subtitle: 'per launch',
    features: [
      'Everything in Standard',
      'Priority support',
      'AI launch suggestions',
      'Advanced analytics'
    ],
    featured: false,
  },
];

const PricingSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.from === 'create-launch') {
      // showNotification('Upgrade to continue creating launches 🚀', 'info');
       console.log('User redirected from create launch');
    }
  }, [location.state]);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      
      {/* Heading */}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Simple & Transparent Pricing
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 6 }}>
        Choose the plan that fits your launch goals 🚀
      </Typography>

      {/* Plans */}
      <Grid container spacing={4} justifyContent="center">
        {plans.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card
              elevation={p.featured ? 10 : 2}
              sx={{
                borderRadius: 4,
                p: 2,
                height: '100%',
                position: 'relative',
                border: p.featured ? '2px solid #1976d2' : '1px solid #eee',
                transform: p.featured ? 'scale(1.05)' : 'scale(1)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              {/* Badge */}
              {p.featured && (
                <Chip
                  label="Most Popular"
                  color="primary"
                  sx={{ position: 'absolute', top: 16, right: 16 }}
                />
              )}

              <CardContent>
                {/* Title */}
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {p.title}
                </Typography>

                {/* Price */}
                <Typography variant="h3" sx={{ fontWeight: 800, my: 2 }}>
                  {p.price}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {p.subtitle}
                </Typography>

                {/* Features */}
                <Box sx={{ textAlign: 'left', mb: 3 }}>
                  {p.features.map((f, i) => (
                    <Typography key={i} sx={{ mb: 1 }}>
                      ✅ {f}
                    </Typography>
                  ))}
                </Box>

                {/* CTA */}
                <Button
                  fullWidth
                  variant={p.featured ? 'contained' : 'outlined'}
                  size="large"
                  onClick={() => navigate('/checkout', { state: { plan: p.id } })}
                >
                  {p.id === 'basic' ? 'Get Started Free' : 'Upgrade Now'}
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