import axios from 'axios';
import { hostname } from '../consts';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = hostname;
axiosInstance.defaults.headers['Content-type'] = 'application/json';
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!'),
);

export default axiosInstance;
