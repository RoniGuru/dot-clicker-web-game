import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface game {
  start: false;
  level: number;
  timer: number;
  dots: boolean[];
  highScore: number;
}

const initialState: game = {
  start: false,
  level: 1,
  timer: 20,
  dots: [false, false, false, false],
  highScore: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetDots: () => {},
    startGame: () => {},
    endGame: () => {},
    setDot: () => {},
    setHighScore: () => {},
  },
});

export const { resetDots, startGame, endGame, setDot, setHighScore } =
  gameSlice.actions;
export default gameSlice.reducer;
