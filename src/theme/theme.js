import { createTheme } from '@mui/material/styles'

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#6C5CE7',
      light: '#A29BFE',
      dark: '#4834D4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00CEC9',
      light: '#81ECEC',
      dark: '#00B894',
    },
    success: { main: '#00B894', light: '#55EFC4', dark: '#00856F' },
    warning: { main: '#FDCB6E', light: '#FFE0A3', dark: '#E17055' },
    error: { main: '#E17055', light: '#FF7675', dark: '#D63031' },
    background: {
      default: mode === 'light' ? '#F8F7FF' : '#0F0E1A',
      paper: mode === 'light' ? '#FFFFFF' : '#1A1928',
    },
    text: {
      primary: mode === 'light' ? '#2D3436' : '#F0EFFE',
      secondary: mode === 'light' ? '#636E72' : '#A29BFE',
    },
    divider: mode === 'light' ? 'rgba(108,92,231,0.1)' : 'rgba(162,155,254,0.1)',
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
  },
  shape: { borderRadius: 16 },
  shadows: [
    'none',
    '0px 2px 8px rgba(108,92,231,0.06)',
    '0px 4px 16px rgba(108,92,231,0.08)',
    '0px 6px 24px rgba(108,92,231,0.10)',
    '0px 8px 32px rgba(108,92,231,0.12)',
    '0px 12px 40px rgba(108,92,231,0.14)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0px 4px 24px rgba(108,92,231,0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 32px rgba(108,92,231,0.14)',
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, fontWeight: 600, padding: '8px 20px' },
        contained: {
          background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
          boxShadow: '0 4px 16px rgba(108,92,231,0.3)',
          '&:hover': { background: 'linear-gradient(135deg, #5A4BD1, #9B8FFE)', boxShadow: '0 6px 20px rgba(108,92,231,0.4)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 8, height: 8 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          border: 'none',
          background: mode === 'light'
            ? 'linear-gradient(180deg, #FFFFFF 0%, #F8F7FF 100%)'
            : 'linear-gradient(180deg, #1A1928 0%, #0F0E1A 100%)',
        }),
      },
    },
  },
})
