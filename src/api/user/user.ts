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

    localStorage.setItem('token', result.data.token);
    return result.data.token;
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
