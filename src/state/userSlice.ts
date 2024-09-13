import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, tokenRoute } from '../api';
import { loginData } from '../components/Nav/Navbar';

interface user {
  id: number | null;
  name: string;
  score: number;
}

export const initialState: user = {
  id: null,
  name: '',
  score: 0,
};

export const logInUser = createAsyncThunk(
  'user/logInUser',
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const result = await api.post(
        '/user/login',
        {
          name: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data: loginData = result.data;

      const returnedUser = {
        id: data.user.id,
        name: data.user.name,
        score: data.user.score,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      return returnedUser;
    } catch (err: any) {
      // Enhance error logging
      console.error('Problem logging in user:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      // Create a custom error object
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
      await api.post('/user/logout', {
        id: id,
      });
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
      console.log('updating user score');
      await tokenRoute.put('/user/updateScore', {
        id: user.id,
        score: score,
      });
      return user.score;
    } catch (err) {
      console.log('problem updating  user ', err);
      throw err;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ user, score }: { user: user; score: number }) => {
    try {
      console.log('updating user score');
      await tokenRoute.put('/user/updateScore', {
        id: user.id,
        score: score,
      });
      return user.score;
    } catch (err) {
      console.log('problem updating  user ', err);
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
      );
  },
});

export default userSlice.reducer;
