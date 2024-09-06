import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, tokenRoute } from '../api';
import { loginData } from '../components/Navbar';

interface user {
  id: number | null;
  name: string;
  score: number;
  accessToken: string;
  refreshToken: string;
}

export const initialState: user = {
  id: null,
  name: '',
  score: 0,
  accessToken: '',
  refreshToken: '',
};

export const logInUser = createAsyncThunk(
  'user/logInUser',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await api.post('/user/login', {
        name: username,
        password: password,
      });

      const data: loginData = result.data;

      const returnedUser = {
        id: data.user.id,
        name: data.user.name,
        score: data.user.score,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      return returnedUser; // successful case
    } catch (err: any) {
      console.error('Problem logging in user:', err);

      return rejectWithValue(err.response?.data);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'user/logOutUser',
  async (id: number) => {
    try {
      const result = await api.post('/user/logout', {
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
      await tokenRoute.put(
        '/user/updateScore',
        {
          id: user.id,
          score: score,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, // Bearer token for authorization
          },
        }
      );
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
      await tokenRoute.put(
        '/user/updateScore',
        {
          id: user.id,
          score: score,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, // Bearer token for authorization
          },
        }
      );
      return user.score;
    } catch (err) {
      console.log('problem updating  user ', err);
      throw err;
    }
  }
);

interface RefreshTokenResponse {
  accessToken: string;
}

export const refreshUserAccessToken = createAsyncThunk(
  'user/refreshToken',
  async (user: user) => {
    try {
      const result = await api.put<RefreshTokenResponse>('/user/updateScore', {
        refreshToken: user.refreshToken,
      });
      return result.data.accessToken;
    } catch (err) {
      console.log('problem updating  user ', err);
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user>) => {
      console.log('set user');
      return { ...action.payload };
    },
    logOutUser: (state) => {
      state.id = null;
      state.name = '';
      state.score = 0;
    },
    updateUserScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.fulfilled, (state, action: PayloadAction<user>) => {
        return action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.id = null;
        state.name = '';
        state.score = 0;
        state.refreshToken = '';
        state.accessToken = '';
      })
      .addCase(
        updateUserScore.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.score = action.payload;
        }
      )
      .addCase(
        refreshUserAccessToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.accessToken = action.payload;
        }
      );
  },
});

export default userSlice.reducer;
