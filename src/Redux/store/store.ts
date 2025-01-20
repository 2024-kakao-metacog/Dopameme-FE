import { configureStore } from '@reduxjs/toolkit';
import { videoApi } from '../slice/videoApi';
import videoReducer from '../slice/videoSlice';
import { authApi } from '../slice/authApi';
import authReducer from '../slice/authSlice';
import { subscriptionApi } from '../slice/subApi';
import subscriptionReducer from '../slice/subSlice';

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
    videos: videoReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    subscriptions: subscriptionReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(videoApi.middleware).concat(authApi.middleware).concat(subscriptionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
