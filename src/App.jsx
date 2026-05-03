// App.js

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import router from './routes';
import { AuthProvider } from './context/AuthContext';
import { getTheme } from './theme/theme';
import { useDarkMode } from './hooks/useLocalStorage';
import Notification from './components/Notification';
import { useNotification } from './hooks/useNotification';

const AppContent = () => {
  const { notification, closeNotification } = useNotification();

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={closeNotification}
      />
    </>
  );
};

function App() {
  const [darkMode] = useDarkMode();
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;