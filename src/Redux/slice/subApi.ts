import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi', // 상태 이름 (리듀서 이름)
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // API 기본 URL 설정
  endpoints: builder => ({
    addSubscription: builder.mutation<void, { id: string; nickname: string }>({
      query: ({ id, nickname }) => ({
        url: '/subscriptions',
        method: 'POST',
        body: { id, nickname },
      }),
    }),
    removeSubscription: builder.mutation<void, string>({
      query: id => ({
        url: `/subscriptions/${id}`,
        method: 'DELETE',
      }),
    }),
    getSubscriptions: builder.query<{ id: string; nickname: string }[], string>({
      query: userId => ({
        url: `/subscriptions/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddSubscriptionMutation, useRemoveSubscriptionMutation, useGetSubscriptionsQuery } = subscriptionApi;
