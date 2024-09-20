import { error } from 'console';
import { api, tokenRoute } from './config';

export async function getNewToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const result = await api.post('/user/token', {
      refreshToken: refreshToken,
    });

    return result.data.accessToken;
  } catch (err) {
    console.log('problem getting token  ', err);
    throw err;
  }
}

export const registerUser = async (username: string, password: string) => {
  return api.post('/user/register', {
    name: username,
    password: password,
  });
};

export const loginUser = async (username: string, password: string) => {
  return api.post('/user/login', { name: username, password });
};

export const logoutUser = async (id: number) => {
  return api.post('/user/logout', { id });
};

export const updateUserScore = async (id: number, score: number) => {
  return tokenRoute.put('/user/updateScore', { id, score });
};

export const deleteUser = async (name: string, password: string) => {
  return tokenRoute.delete('/user/delete', { data: { name, password } });
};

export const updateUserName = async (
  id: number,
  password: string,
  newName: string,
  name: string
) => {
  return tokenRoute.put('/user/updateName', {
    id: id,
    password: password,
    newName: newName,
    name: name,
  });
};

export const updateUserPassword = async (
  id: number,
  password: string,
  newPassword: string,
  name: string
) => {
  return tokenRoute.put('/user/updatePassword', {
    id: id,
    password: password,
    newPassword: newPassword,
    name: name,
  });
};

export const getLeaderBoard = async () => {
  try {
    const result = await api.get('/user/leaderBoard');

    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
