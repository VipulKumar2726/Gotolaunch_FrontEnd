import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const features = [
  { title: 'Smart Launch Timeline', icon: <TimelineIcon fontSize="large" />, desc: 'Visual plan to keep tasks on schedule.' },
  { title: 'Automated Checklist', icon: <PlaylistAddCheckIcon fontSize="large" />, desc: 'Pre-built checklist with automation.' },
  { title: 'Launch Day Mode', icon: <RocketLaunchIcon fontSize="large" />, desc: 'Focus view for launch day operations.' },
  { title: 'Post-Launch Reports', icon: <AssessmentIcon fontSize="large" />, desc: 'Clean reports to evaluate performance.' },
  { title: 'Reminder System', icon: <NotificationsActiveIcon fontSize="large" />, desc: 'Email and in-app reminders.' },
  { title: 'Clean Founder Dashboard', icon: <DashboardCustomizeIcon fontSize="large" />, desc: 'All launch details in one place.' },
];

const FeaturesSection = () => {
  return (
    <Box id="features" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Features
      </Typography>
      <Grid container spacing={3}>
        {features.map((f) => (
          <Grid item xs={12} sm={6} md={4} key={f.title}>
            <Card elevation={2} sx={{ height: '100%', transition: 'transform 0.18s ease, box-shadow 0.18s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  {f.icon}
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{f.title}</Typography>
                </Box>
                <Typography color="text.secondary">{f.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
