import { configureStore } from '@reduxjs/toolkit';
import { videoApi } from './videoApi';
import videoReducer from './videoSlice';

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    videos: videoReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(videoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
