import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
});

export const { setUser, logOutUser, updateUserScore, updateUserName } =
  userSlice.actions;
export default userSlice.reducer;
