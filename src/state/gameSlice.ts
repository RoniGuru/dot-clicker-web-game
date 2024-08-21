import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface game {
  start: boolean;
  level: number;
  timer: number;
  highScore: number;
}

const initialState: game = {
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
    endGame: (state, action: PayloadAction<number>) => {
      state.start = false;
      if (action.payload > state.highScore) {
        state.highScore = action.payload;
      }
    },
  },
});

export const { startGame, endGame } = gameSlice.actions;
export default gameSlice.reducer;
