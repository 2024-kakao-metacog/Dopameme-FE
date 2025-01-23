import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  nickname: string | null;
  id: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('access_token'),
  nickname: localStorage.getItem('nickname'),
  id: localStorage.getItem('id'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ accessToken: string; nickname: string; id: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.nickname = action.payload.nickname;
      state.id = action.payload.id;

      localStorage.setItem('access_token', state.accessToken);
      localStorage.setItem('nickname', state.nickname);
      localStorage.setItem('id', state.id);
    },
    clearAuth: state => {
      state.accessToken = null;
      state.nickname = null;
      state.id = null;

      localStorage.removeItem('access_token');
      localStorage.removeItem('nickname');
      localStorage.removeItem('id');
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
