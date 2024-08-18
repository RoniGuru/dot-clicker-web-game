import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface game {
  start: false;
  level: number;
  timer: number;
  dots: boolean[];
}

const initialState: game = {
  start: false,
  level: 1,
  timer: 20,
  dots: [false, false, false, false],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetDots: () => {},
    startGame: () => {},
    endGame: () => {},
    setDot: () => {},
  },
});

export const { resetDots, startGame, endGame, setDot } = gameSlice.actions;
export default gameSlice.reducer;
