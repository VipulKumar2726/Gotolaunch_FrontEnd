import axiosInstance from './axiosInstance';

export const createOrder = (amount) => {
  return axiosInstance.post('/payment/create-order', { amount });
};