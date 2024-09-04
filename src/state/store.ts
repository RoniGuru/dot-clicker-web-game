import { configureStore } from '@reduxjs/toolkit';
import gameSliceReducer from './gameSlice';
import userSliceReducer from './userSlice';

export const store = configureStore({
  reducer: { game: gameSliceReducer, user: userSliceReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
