import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from '../api/user';

export interface rank {
  username: string;
  high_score: number;
}
export interface ranking {
  ranks: rank[];
  loading: boolean;
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
  loading: false,
};

const leaderBoardSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getLeaderBoard.fulfilled,
        (state, action: PayloadAction<rank[]>) => {
          state.ranks = action.payload;
          state.loading = false;
        }
      );
  },
});

export default leaderBoardSlice.reducer;
