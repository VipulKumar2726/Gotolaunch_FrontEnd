import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Login', href: '/login' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}>
              GoToLaunch
            </Typography>
          </Box>

          {!isMobile && (
            <Stack direction="row" spacing={2} alignItems="center">
              {navLinks.map((l) => (
                <Button key={l.label} component={l.href.startsWith('#') ? 'a' : RouterLink} to={l.href.startsWith('#') ? undefined : l.href} href={l.href.startsWith('#') ? l.href : undefined} color="inherit">
                  {l.label}
                </Button>
              ))}

              <Button component={RouterLink} to="/login" variant="text">
                Login
              </Button>

              <Button component={RouterLink} to="/register" variant="contained" color="primary">
                Get Started
              </Button>
            </Stack>
          )}

          {isMobile && (
            <>
              <IconButton edge="end" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 240 }} role="presentation" onClick={() => setOpen(false)}>
                  <List>
                    {navLinks.map((l) => (
                      <ListItem button key={l.label} component={l.href.startsWith('#') ? 'a' : RouterLink} to={l.href.startsWith('#') ? undefined : l.href} href={l.href.startsWith('#') ? l.href : undefined}>
                        <ListItemText primary={l.label} />
                      </ListItem>
                    ))}

                    <ListItem button component={RouterLink} to="/register">
                      <ListItemText primary="Get Started" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
