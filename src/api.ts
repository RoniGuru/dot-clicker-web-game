import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

async function getNewToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const result = await api.post('/user/token', {
      refreshToken: refreshToken,
    });

    //if result is expired  then log user out

    localStorage.setItem('token', result.data.token);

    return result.data.token;
  } catch (err) {
    console.log('problem getting token  ', err);
    throw err;
  }
}

export const tokenRoute = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

tokenRoute.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

tokenRoute.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await getNewToken();

        tokenRoute.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout user)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// tokenRoute.interceptors.request.use(
//   async (config) => {
//     let currentDate = new Date();
//     let token = localStorage.getItem('token');
//     console.log('token', token);
//     if (token === undefined || token === null) {
//       console.log('token is undefined');
//       await getNewToken();
//       config.headers['Authorization'] = `Bearer ${token}`;
//     } else if (token) {
//       const decodedToken = jwtDecode(token);

//       if (decodedToken.exp) {
//         if (decodedToken.exp * 1000 < currentDate.getTime()) {
//           await getNewToken();
//           token = localStorage.getItem('token');
//           config.headers['authorization'] = 'Bearer ' + token;
//         }
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
