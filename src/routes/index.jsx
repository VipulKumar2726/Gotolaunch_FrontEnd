import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import LaunchDetailPage from '../pages/LaunchDetailPage';
import LaunchDayPage from '../pages/LaunchDayPage';
import ReportPage from '../pages/ReportPage';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/launch/:id',
    element: (
      <ProtectedRoute>
        <LaunchDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/launch/:id/day',
    element: (
      <ProtectedRoute>
        <LaunchDayPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/report/:launchId',
    element: (
      <ProtectedRoute>
        <ReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
