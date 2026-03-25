import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import router from './routes';
import { AuthProvider } from './context/AuthContext';
import lightTheme from './utils/theme';
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
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
