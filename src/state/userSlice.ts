import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as userAPI from '../api/user';
import { AxiosError, isAxiosError } from 'axios';

export interface user {
  id: number | null;
  name: string;
  score: number;
}
export interface userData {
  user: user;
  loading: boolean;
}

export const initialState: userData = {
  user: { id: null, name: '', score: 0 },
  loading: false,
};

interface LoginResponse {
  user: user;
  accessToken: string;
  refreshToken: string;
}
export const logInUser = createAsyncThunk(
  'user/logInUser',
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await userAPI.loginUser(username, password);
      const data: LoginResponse = response.data;

      const returnedUser = {
        id: data.user.id,
        name: data.user.name,
        score: data.user.score,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      return returnedUser;
    } catch (err: any) {
      if (isAxiosError(err)) {
        const axiosError = err as AxiosError;
        alert(axiosError.response!.data);
      }

      throw err;
    }
  }
);

export const logOutUser = createAsyncThunk(
  'user/logOutUser',
  async (id: number) => {
    try {
      await userAPI.logoutUser(id);
    } catch (err) {
      console.log('problem logging out  user ', err);
      throw err;
    }
  }
);

export const updateUserScore = createAsyncThunk(
  'user/updateUserScore',
  async ({ user, score }: { user: user; score: number }) => {
    try {
      await userAPI.updateUserScore(user.id!, score);
      return score;
    } catch (err) {
      if (isAxiosError(err)) {
        const axiosError = err as AxiosError;
        alert(axiosError.response!.data);
      }
      console.log('problem updating  user ', err);
      throw err;
    }
  }
);

export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async ({
    id,
    name,
    newName,
    password,
  }: {
    id: number;
    name: string;
    password: string;
    newName: string;
  }) => {
    try {
      await userAPI.updateUserName(id, password, newName, name);
      return newName;
    } catch (err: any) {
      if (isAxiosError(err)) {
        const axiosError = err as AxiosError;
        alert(axiosError.response!.data);
      }
      console.log('problem updating  user name', err);

      throw err;
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async ({
    id,
    name,
    newPassword,
    password,
  }: {
    id: number;
    name: string;
    password: string;
    newPassword: string;
  }) => {
    try {
      await userAPI.updateUserPassword(id, password, newPassword, name);
    } catch (err) {
      if (isAxiosError(err)) {
        const axiosError = err as AxiosError;
        alert(axiosError.response!.data);
      }
      console.log('problem updating  user password', err);
      throw err;
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/updateUser',
  async ({ name, password }: { name: string; password: string }) => {
    try {
      const result = await userAPI.deleteUser(name, password);
      return result.status !== 401;
    } catch (err) {
      if (isAxiosError(err)) {
        const axiosError = err as AxiosError;
        alert(axiosError.response!.data);
      }
      console.log('problem deleting  user ', err);
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(logInUser.fulfilled, (state, action: PayloadAction<user>) => {
        state.user.id = action.payload.id;
        state.user.name = action.payload.name;
        state.user.score = action.payload.score;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user.id = null;
        state.user.name = '';
        state.user.score = 0;
      })
      .addCase(
        updateUserScore.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.user.score = action.payload;
        }
      )
      .addCase(updateUserScore.pending, (state) => {
        state.loading = false;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          if (action.payload) {
            state.user.id = null;
            state.user.name = '';
            state.user.score = 0;
          }
        }
      )
      .addCase(
        updateUserName.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.user.name = action.payload;
        }
      )
      .addCase(updateUserPassword.fulfilled, () => {});
  },
});

export default userSlice.reducer;
