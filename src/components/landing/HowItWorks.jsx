import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const steps = [
  { title: 'Create Your Launch', desc: 'Add product details and schedule your launch.' },
  { title: 'Follow the Smart Checklist', desc: 'Step-by-step guidance and automation.' },
  { title: 'Execute & Track Results', desc: 'Run launch day and monitor metrics.' },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        How It Works
      </Typography>
      <Grid container spacing={3}>
        {steps.map((s, idx) => (
          <Grid item xs={12} md={4} key={s.title}>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.12 }}>
              <Paper elevation={2} sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {idx + 1}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{s.title}</Typography>
                  <Typography color="text.secondary">{s.desc}</Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
