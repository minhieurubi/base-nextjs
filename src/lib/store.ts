import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import settingsReducer from './slices/settings';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
