import { createTheme } from '@mui/material/styles'

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: '#FF6154', // Product Hunt orange
        light: '#FF8A80',
        dark: '#E64A3B',
        contrastText: '#FFFFFF',
      },

      secondary: {
        main: '#111827',
      },

      success: {
        main: '#16A34A',
      },

      warning: {
        main: '#F59E0B',
      },

      error: {
        main: '#DC2626',
      },

      background: {
        default: mode === 'light' ? '#F9F9F9' : '#0F1115',
        paper: mode === 'light' ? '#FFFFFF' : '#171923',
      },

      text: {
        primary: mode === 'light' ? '#111827' : '#F3F4F6',
        secondary: mode === 'light' ? '#6B7280' : '#9CA3AF',
      },

      divider:
        mode === 'light'
          ? 'rgba(0,0,0,0.08)'
          : 'rgba(255,255,255,0.08)',
    },

    typography: {
      fontFamily: '"Inter", sans-serif',

      h1: {
        fontWeight: 700,
        letterSpacing: '-1px',
      },

      h2: {
        fontWeight: 700,
      },

      h3: {
        fontWeight: 700,
      },

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 600,
      },

      h6: {
        fontWeight: 600,
      },

      body1: {
        lineHeight: 1.7,
      },

      body2: {
        lineHeight: 1.6,
      },

      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.95rem',
      },
    },

    shape: {
      borderRadius: 14,
    },

    shadows: [
      'none',
      '0 1px 2px rgba(0,0,0,0.05)',
      '0 2px 6px rgba(0,0,0,0.06)',
      '0 4px 12px rgba(0,0,0,0.08)',
      '0 8px 24px rgba(0,0,0,0.08)',
      '0 12px 32px rgba(0,0,0,0.10)',
      ...Array(19).fill('none'),
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            WebkitFontSmoothing: 'antialiased',
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 18,

            border: `1px solid ${theme.palette.divider}`,

            backgroundImage: 'none',

            boxShadow:
              mode === 'light'
                ? '0 2px 10px rgba(0,0,0,0.04)'
                : '0 2px 10px rgba(0,0,0,0.30)',

            transition: 'all 0.2s ease',

            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow:
                mode === 'light'
                  ? '0 8px 24px rgba(0,0,0,0.08)'
                  : '0 8px 24px rgba(0,0,0,0.35)',
            },
          }),
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 600,
          },

          contained: {
            background: '#FF6154',
            boxShadow: 'none',

            '&:hover': {
              background: '#F04E41',
              boxShadow: 'none',
            },
          },

          outlined: ({ theme }) => ({
            borderColor: theme.palette.divider,

            '&:hover': {
              background:
                mode === 'light'
                  ? 'rgba(0,0,0,0.03)'
                  : 'rgba(255,255,255,0.04)',
            },
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRight: `1px solid ${theme.palette.divider}`,

            background:
              mode === 'light'
                ? '#FFFFFF'
                : '#171923',
          }),
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            background:
              mode === 'light'
                ? 'rgba(255,255,255,0.92)'
                : 'rgba(23,25,35,0.92)',

            backdropFilter: 'blur(12px)',

            borderBottom: `1px solid ${theme.palette.divider}`,

            boxShadow: 'none',
          }),
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
            },
          },
        },
      },
    },
  })