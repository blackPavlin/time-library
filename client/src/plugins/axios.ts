import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
});

client.interceptors.request.use(
  (config) => {
    if (config?.headers?.Authorization) {
      return config;
    }

    const token = localStorage.getItem('token');

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  },
  (error) => Promise.reject(error.message)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 404 ||
      error?.response?.status === 409 ||
      error?.response?.status === 500
    ) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default client;
