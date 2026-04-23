import axios from 'axios';

const axiosInstance = axios.create({
  // Base URL for backend API
  baseURL: 'http://localhost:5001/',
});

export default axiosInstance;