import axios from 'axios';

const baseURL = import.meta.env.PROD 
  ? 'https://quiz-app-production-0be8.up.railway.app/api'
  : '/api';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(
        new Error('Cannot reach the API server. Check that the backend is running and MongoDB is configured.'),
      );
    }

    return Promise.reject(
      new Error(error.response.data?.message || 'Something went wrong. Please try again.'),
    );
  },
);

export default api;