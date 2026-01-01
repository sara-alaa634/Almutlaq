
import axios from 'axios';
import { handleApiError } from "../helpers/apiError";
import { getToken, removeToken, isTokenExpired } from '../Services/TokenService';

// Setup the API client with axios
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptor to handle tokens and content type
apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token && !isTokenExpired()) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    removeToken();
  }

  // Set Content-Type dynamically based on method and data
  if (config.method === 'post' || config.method === 'put') {
    if (config.data instanceof FormData) {
      // Do not set Content-Type for FormData; let the browser handle it
      delete config.headers['Content-Type'];
    } else {
      // If the data is an object, set Content-Type to application/json
      config.headers['Content-Type'] = 'application/json';
      // Ensure the data is serialized to JSON
      // if (typeof config.data === 'object') {
      //   config.data = JSON.stringify(config.data);
      // }
    }
  }

  return config;
}, (error) => Promise.reject(error));

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle expired token scenario
      if (isTokenExpired()) {
        removeToken();
        // Optionally, you might want to redirect the user to the login page
        // window.location.href = '/login';
      }
    }
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default apiClient;