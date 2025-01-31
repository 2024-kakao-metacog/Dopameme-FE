import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subscription, SubscriptionState } from '../../types/Subscribe';

const initialState: SubscriptionState = {
  subscriptions: [],
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptions: (state, action: PayloadAction<Subscription[]>) => {
      state.subscriptions = action.payload;
    },
    clearSubscriptions: state => {
      state.subscriptions = [];
    },
  },
});

export const { setSubscriptions, clearSubscriptions } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
