import axios from 'axios';
import { hostname, authorization } from '../consts';

// import https from 'https';
// const agents = new https.Agent({
//   rejectUnauthorized: false,
// });

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = hostname;
// axiosInstance.defaults.httpsAgent = agents;
axiosInstance.defaults.headers['Content-type'] = 'application/json';
axiosInstance.defaults.headers.authorization = authorization;
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!'),
);

export default axiosInstance;
