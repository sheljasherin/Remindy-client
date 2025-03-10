import axios from "axios";

const SERVER_BASE_URL = "http://localhost:5000/auth";

export const registerUserAPI = (userData) => axios.post(`${SERVER_BASE_URL}/register`, userData);
export const loginUserAPI = (userData) => axios.post(`${SERVER_BASE_URL}/login`, userData);
export const getProfileAPI = (token) => axios.get(`${SERVER_BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
