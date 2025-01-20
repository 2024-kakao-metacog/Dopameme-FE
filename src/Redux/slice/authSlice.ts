import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  nickname: string | null;
}

const initialState: AuthState = {
  token: null,
  nickname: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; nickname: string }>) => {
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
    },
    clearAuth: state => {
      state.token = null;
      state.nickname = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
