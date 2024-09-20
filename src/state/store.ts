import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameSliceReducer from './gameSlice';
import userSliceReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import leaderBoardReducer from './leaderBoardSlice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist these reducers
};

const rootReducer = combineReducers({
  game: gameSliceReducer,
  user: userSliceReducer,
  leaderBoard: leaderBoardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
