import { useLayoutEffect, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import api from '../api';
import { jwtDecode } from 'jwt-decode';

interface user {
  id: number;
  name: string;
  score: number;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    //get token
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      //send token to backend and get back new refresh token
      const res = await api.post('user/token', {
        refresh: refreshToken,
      });
      //if success get back access token
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration: number | undefined = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration! < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/" />;
}
