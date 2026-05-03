import {
  Grid, Card, CardContent, Typography, Box, Button, Switch, Divider,
  TextField, Avatar, Chip,
} from '@mui/material'
import { Settings } from '@mui/icons-material'
import PageHeader from '../components/PageHeader'

export default function SettingsPage({ darkMode, onToggleDark }) {
  return (
    <Box>
      <PageHeader title="Settings" subtitle="Manage your account and preferences" icon={<Settings />} breadcrumb />
      <Grid container spacing={2.5}>
        {/* Profile */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>Profile Settings</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', fontSize: 22, fontWeight: 700 }}>AJ</Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Alex Johnson</Typography>
                  <Typography variant="body2" color="text.secondary">alex@startup.io</Typography>
                  <Button size="small" sx={{ mt: 0.5, px: 0 }}>Change Photo</Button>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Full Name" defaultValue="Alex Johnson" size="small" fullWidth />
                <TextField label="Email Address" defaultValue="alex@startup.io" size="small" fullWidth />
                <TextField label="Company / Product" defaultValue="GoToLaunch" size="small" fullWidth />
                <Button variant="contained" size="small" sx={{ alignSelf: 'flex-start' }}>Save Changes</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>Preferences</Typography>
              {[
                { label: 'Dark Mode', desc: 'Switch between light and dark interface', toggle: true, value: darkMode, onChange: onToggleDark },
                { label: 'Email Notifications', desc: 'Receive launch reminders and tips via email', toggle: true, value: true },
                { label: 'Launch Alerts', desc: 'Push alerts when competitors launch in your category', toggle: true, value: false },
                { label: 'Weekly Digest', desc: 'Get a weekly summary of your product performance', toggle: true, value: true },
              ].map((item, i) => (
                <Box key={i}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                    </Box>
                    <Switch defaultChecked={item.value} onChange={item.onChange} color="primary" />
                  </Box>
                  {i < 3 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Plan */}
        <Grid size={12}>
          <Card sx={{ background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #00CEC9 100%)', color: '#fff' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Chip label="FREE PLAN" sx={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>Upgrade to GoToLaunch Pro</Typography>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>Unlock AI strategy, unlimited products, analytics exports, and priority support.</Typography>
              </Box>
              <Button variant="contained" sx={{ background: '#fff', color: '#6C5CE7', fontWeight: 700, '&:hover': { background: 'rgba(255,255,255,0.9)' } }}>
                Upgrade Now – $49/mo
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
