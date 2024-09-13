import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const result = await api.put('/user/token', {
      refreshToken: refreshToken,
    });

    localStorage.setItem('token', result.data.token);
  } catch (err) {
    console.log('problem updating  user ', err);
    throw err;
  }
}

export const tokenRoute = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

tokenRoute.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    let token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No  token available');
    }
    config.headers['Authorization'] = `Bearer ${token}`;
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp) {
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await refreshToken();
        token = localStorage.getItem('token');
        config.headers['authorization'] = 'Bearer ' + token;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
