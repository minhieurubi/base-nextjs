import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  lng: string;
}

const initialState: SettingsState = {
  lng: 'en', // Default language
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lng = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
