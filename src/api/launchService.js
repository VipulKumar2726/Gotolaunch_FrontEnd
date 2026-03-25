import axiosInstance from './axiosInstance';

const launchService = {
  // Launch CRUD operations
  getAllLaunches: async () => {
    const response = await axiosInstance.get('/launch/all');
    return response.data;
  },

  getLaunchById: async (id) => {
    const response = await axiosInstance.get(`/launch/${id}`);
    return response.data;
  },

  createLaunch: async (launchData) => {
    const response = await axiosInstance.post('/launch/create', launchData);
    return response.data;
  },

  updateLaunch: async (id, launchData) => {
    const response = await axiosInstance.put(`/launch/${id}`, launchData);
    return response.data;
  },

  deleteLaunch: async (id) => {
    const response = await axiosInstance.delete(`/launch/${id}`);
    return response.data;
  },

  // Checklist operations
  getChecklist: async (launchId) => {
    const response = await axiosInstance.get(`/launch/${launchId}/checklist`);
    return response.data;
  },

  toggleChecklistItem: async (launchId, itemId) => {
    const response = await axiosInstance.put(
      `/launch/${launchId}/checklist/${itemId}/toggle`,
      {}
    );
    return response.data;
  },

  addChecklistItem: async (launchId, itemData) => {
    const response = await axiosInstance.post(
      `/launch/${launchId}/checklist`,
      itemData
    );
    return response.data;
  },

  deleteChecklistItem: async (launchId, itemId) => {
    const response = await axiosInstance.delete(
      `/launch/${launchId}/checklist/${itemId}`
    );
    return response.data;
  },

  // Report operations
  getReport: async (launchId) => {
    try {
      const response = await axiosInstance.get(`/launch/${launchId}/report`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  submitReport: async (launchId, reportData) => {
    const response = await axiosInstance.post(
      `/launch/${launchId}/report`,
      reportData
    );
    return response.data;
  },

  updateReport: async (launchId, reportData) => {
    const response = await axiosInstance.put(
      `/launch/${launchId}/report`,
      reportData
    );
    return response.data;
  },
};

export default launchService;
