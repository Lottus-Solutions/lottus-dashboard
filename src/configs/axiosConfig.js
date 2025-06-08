import axios from 'axios';

const getToken = () => localStorage.getItem('token');

axios.defaults.baseURL = 'http://localhost:8081/api'; 
axios.defaults.headers.common['Authorization'] = getToken() ? `Bearer ${getToken()}` : '';

// Interceptor de requisição para garantir que o token esteja sempre atualizado
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Sessão expirada ou não autorizada.');
    }
    return Promise.reject(error);
  }
);

export default axios;
