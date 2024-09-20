import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from '../api/user';
import { act } from 'react';

export interface rank {
  username: string;
  high_score: number;
}
export interface ranking {
  ranks: rank[];
}

export const getLeaderBoard = createAsyncThunk(
  'user/getLeaderBoard',
  async () => {
    try {
      const result = await userAPI.getLeaderBoard();

      return result;
    } catch (err) {
      console.log('problem updating  user name', err);
      throw err;
    }
  }
);
export const initialState: ranking = {
  ranks: [],
};

const leaderBoardSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getLeaderBoard.fulfilled,
      (state, action: PayloadAction<rank[]>) => {
        state.ranks = action.payload;
      }
    );
  },
});

export default leaderBoardSlice.reducer;
