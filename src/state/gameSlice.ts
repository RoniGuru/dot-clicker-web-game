import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface game {
  start: boolean;
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
    startGame: (state) => {
      state.start = true;
      const randomNum = Math.floor(Math.random() * state.dots.length);

      state.dots[randomNum] = true;
    },
    endGame: (state, action: PayloadAction<number>) => {
      state.start = false;
      if (action.payload > state.highScore) {
        state.highScore = action.payload;
      }

      const newDots = Array(state.dots.length).fill(false);

      state.dots = newDots;
    },
    setDot: (state) => {
      const randomNum = Math.floor(Math.random() * state.dots.length);

      state.dots[randomNum] = true;
    },
    resetDot: (state, action: PayloadAction<number>) => {
      state.dots[action.payload] = false;
    },
  },
});

export const { startGame, endGame, setDot, resetDot } = gameSlice.actions;
export default gameSlice.reducer;
