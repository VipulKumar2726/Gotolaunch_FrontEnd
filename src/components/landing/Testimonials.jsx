import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const items = [
  { name: 'Alex Johnson', quote: 'GoToLaunch made our Product Hunt launch effortless. Highly recommended!' },
  { name: 'Priya Singh', quote: 'The checklist and launch day mode kept our team focused.' },
  { name: 'Marco Rossi', quote: 'Clean dashboard and useful reminders — great tool.' },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50', mt: 4, borderRadius: 1, p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        What Founders Say
      </Typography>
      <Grid container spacing={2}>
        {items.map((t) => (
          <Grid item xs={12} md={4} key={t.name}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="text.secondary">"{t.quote}"</Typography>
                <Box sx={{ mt: 2, fontWeight: 700 }}>{t.name}</Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
