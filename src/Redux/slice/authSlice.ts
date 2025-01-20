import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  nickname: string | null;
  id: string | null;
}

const initialState: AuthState = {
  token: null,
  nickname: null,
  id: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; nickname: string; id: string }>) => {
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
      state.id = action.payload.id;
    },
    clearAuth: state => {
      state.token = null;
      state.nickname = null;
      state.id = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
