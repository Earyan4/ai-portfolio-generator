import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;

export const loginUser = (data) => {
  return axios.post(`${BASE}/api/users/login`, data);
};

export const registerUser = (data) => {
  return axios.post(`${BASE}/api/users/register`, data);
};
