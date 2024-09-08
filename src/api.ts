import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './state/store';
import { refreshUserAccessToken } from './state/userSlice';
import { AppDispatch } from './state/store';
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

async function refreshToken() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  await dispatch(refreshUserAccessToken(user));
}

export const tokenRoute = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

tokenRoute.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const user = useSelector((state: RootState) => state.user);
    const decodedToken = jwtDecode(user.accessToken);

    if (decodedToken.exp) {
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await refreshToken();
        config.headers['authorization'] = 'Bearer ' + user.accessToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
