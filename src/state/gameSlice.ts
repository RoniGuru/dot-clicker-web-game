import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface game {
  start: boolean;
  level: number;
  timer: number;
  highScore: number;
}

export const initialState: game = {
  start: false,
  level: 1,
  timer: 20,

  highScore: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.start = true;
    },
    endGame: (state) => {
      state.start = false;
    },
    setHighScore: (state, action: PayloadAction<number>) => {
      state.highScore = action.payload;
    },
  },
});

export const { startGame, endGame, setHighScore } = gameSlice.actions;
export default gameSlice.reducer;
