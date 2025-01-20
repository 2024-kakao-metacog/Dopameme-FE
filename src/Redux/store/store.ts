import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../slice/authApi';
import authReducer from '../slice/authSlice';
import { subscriptionApi } from '../slice/subApi';
import subscriptionReducer from '../slice/subSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    subscriptions: subscriptionReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware).concat(subscriptionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
