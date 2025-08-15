import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/types/common';

const DEFAULT_INFO = {
  _id: '',
  email: '',
  username: '',
  role: '',
  urlAvatar: '',
  password: '',
};

interface UserState {
  info: UserInfo;
}

const initialState: UserState = {
  info: DEFAULT_INFO,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.info = action.payload;
    },
    clearUserInfo: (state) => {
      state.info = DEFAULT_INFO;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
