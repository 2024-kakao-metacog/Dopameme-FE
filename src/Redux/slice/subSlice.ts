import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionState {
  subscriptions: { id: string; nickname: string }[]; // 구독한 유저의 아이디와 닉네임 목록
}

const initialState: SubscriptionState = {
  subscriptions: [],
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // 구독 추가
    subscribe: (state, action: PayloadAction<{ id: string; nickname: string }>) => {
      const { id, nickname } = action.payload;
      if (!state.subscriptions.some(sub => sub.id === id)) {
        state.subscriptions.push({ id, nickname });
      }
    },

    // 구독 취소
    unsubscribe: (state, action: PayloadAction<string>) => {
      const targetId = action.payload;
      state.subscriptions = state.subscriptions.filter(sub => sub.id !== targetId);
    },

    // 로그인 시 서버에서 받은 구독 정보로 상태 설정
    setSubscriptions: (state, action: PayloadAction<{ id: string; nickname: string }[]>) => {
      state.subscriptions = action.payload;
    },
  },
});

export const { subscribe, unsubscribe, setSubscriptions } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
