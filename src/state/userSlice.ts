import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface user {
  id: number;
  name: string;
  score: number;
}

export const initialState: user | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {},
    logOutUser: (state) => {},
    updateUserScore: (state) => {},
    updateUserName: (state) => {},
    updateUserPassword: (state) => {},
  },
});

export const {
  setUser,
  logOutUser,
  updateUserScore,
  updateUserName,
  updateUserPassword,
} = userSlice.actions;
export default userSlice.reducer;
