import { configureStore } from '@reduxjs/toolkit';
import gameSliceReducer from './gameSlice';

export const store = configureStore({ reducer: { game: gameSliceReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
