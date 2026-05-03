// routes/index.js

import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import LaunchDetailPage from '../pages/LaunchDetailPage';
import LaunchDayPage from '../pages/LaunchDayPage';
import ReportPage from '../pages/ReportPage';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import PricingSection from '../components/landing/PricingSection';
import Checkout from '../pages/Checkout';

import ProductDashboard from '../pages/ProductDashboard';
import LaunchStrategy from '../pages/LaunchStrategy';
import Promotion from '../pages/Promotion';
import ReadinessScore from '../pages/ReadinessScore';
import ContentCopy from '../pages/ContentCopy';
import AudienceTargeting from '../pages/AudienceTargeting';
import Distribution from '../pages/Distribution';
import LaunchTimeline from '../pages/LaunchTimeline';
import EngagementPlaybook from '../pages/EngagementPlaybook';
import PostLaunchGrowth from '../pages/PostLaunchGrowth';
import Settings from '../pages/Settings';

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
    path: '/pricing',
    element: <PricingSection />,
  },
  {
    path: '/create-order',
    element: <Checkout />,
  },

  // Original Protected Pages
  {
    path: '/dashboard',
    element: <Navigate to="/app" replace />,
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

  // Dashboard Layout + Old Product Hunt Project Pages
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProductDashboard />,
      },
      {
        path: 'launches',
        element: <DashboardPage />,
      },
      {
        path: 'launches/:id',
        element: <LaunchDetailPage />,
      },
      {
        path: 'strategy',
        element: <LaunchStrategy />,
      },
      {
        path: 'promotion',
        element: <Promotion />,
      },
      {
        path: 'readiness',
        element: <ReadinessScore />,
      },
      {
        path: 'content',
        element: <ContentCopy />,
      },
      {
        path: 'audience',
        element: <AudienceTargeting />,
      },
      {
        path: 'distribution',
        element: <Distribution />,
      },
      {
        path: 'timeline',
        element: <LaunchTimeline />,
      },
      {
        path: 'engagement',
        element: <EngagementPlaybook />,
      },
      {
        path: 'growth',
        element: <PostLaunchGrowth />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;