import axios from "axios";

const api = axios.create({
  baseURL: 'https://hotel-management-system-1-wral.onrender.com/api',
});

export default api;
