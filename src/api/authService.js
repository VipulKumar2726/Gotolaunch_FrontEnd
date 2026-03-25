import axiosInstance from './axiosInstance';

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email, password, name) => {
    const response = await axiosInstance.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout', {});
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
