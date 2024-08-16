import axios from 'axios';
import config from '../config';
const axiosCtrl = axios.create({
  baseURL: config.SERVER_URL, 
  timeout: 10000 
});

axiosCtrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosCtrl;
