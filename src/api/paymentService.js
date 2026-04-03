import axios from "axios";

export const createOrder = (amount) => {
  return axios.post("/api/payment/create-order", { amount });
};