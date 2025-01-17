import { configureStore } from '@reduxjs/toolkit';
import { videoApi } from '../slice/videoApi';
import videoReducer from '../slice/videoSlice';
import { authApi } from '../slice/authApi';
import authReducer from '../slice/authSlice';

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    videos: videoReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(videoApi.middleware).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
