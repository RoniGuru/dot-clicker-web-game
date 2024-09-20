import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as userAPI from '../api/user';

export interface user {
  id: number | null;
  name: string;
  score: number;
}

export const initialState: user = {
  id: null,
  name: '',
  score: 0,
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
      console.error('Problem logging in user:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      const error: any = new Error(
        err.response?.data?.message || 'An error occurred during login'
      );
      error.status = err.response?.status;
      error.data = err.response?.data;

      throw error;
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
    } catch (err) {
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
      .addCase(logInUser.fulfilled, (state, action: PayloadAction<user>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.score = action.payload.score;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.id = null;
        state.name = '';
        state.score = 0;
      })
      .addCase(
        updateUserScore.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.score = action.payload;
        }
      )
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          if (action.payload) {
            state.id = null;
            state.name = '';
            state.score = 0;
          }
        }
      )
      .addCase(
        updateUserName.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.name = action.payload;
        }
      )
      .addCase(updateUserPassword.fulfilled, () => {});
  },
});

export default userSlice.reducer;
