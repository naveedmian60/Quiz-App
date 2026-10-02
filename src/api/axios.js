import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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
