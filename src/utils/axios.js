import axios from 'axios';
import { hostname } from '../consts';

const errorHandling = (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!');

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = hostname;
axiosInstance.defaults.headers['Content-type'] = 'application/json';

// Middleware
axiosInstance.interceptors.request.use(
  // before hit server...
  (request) => {
    return request;
  },
  (error) => errorHandling(error),
);
axiosInstance.interceptors.response.use(
  // for refresh token from backend
  (response) => {
    const headers = response.headers;
    const newToken = headers['x-new-token'];
    if (newToken) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
      localStorage.setItem('token', newToken);
    }
    return response;
  },
  (error) => errorHandling(error),
);

export default axiosInstance;
