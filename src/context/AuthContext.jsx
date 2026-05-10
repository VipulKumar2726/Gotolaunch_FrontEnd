import React, { createContext, useState, useCallback, useEffect } from 'react';
import authService from '../api/authService';

const AUTH_STORAGE_KEY = 'gotoLaunchAuthUser';

const getStoredUser = () => {
  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Unable to parse stored auth user:', error);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const saveStoredUser = (user) => {
  if (!user) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeAuth = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();

      if (currentUser) {
        setUser(currentUser);
        saveStoredUser(currentUser);
      }

      setError(null);
    } catch (err) {
      console.error('Auth initialization failed:', err);
      setUser((prevUser) => prevUser || getStoredUser());
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      saveStoredUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setUser(null);
      saveStoredUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for unauthorized events
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [logout]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(email, password);
      const authUser = response?.user || response;
      setUser(authUser);
      saveStoredUser(authUser);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email, password, fullName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(email, password, fullName);
      const authUser = response?.user || response;
      setUser(authUser);
      saveStoredUser(authUser);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
