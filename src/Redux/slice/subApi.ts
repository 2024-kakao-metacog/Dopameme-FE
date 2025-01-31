import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../config/env';

interface FollowRequest {
  followerId: number;
}

interface FollowResponse {
  snippet: { id: number; followedUserId: string; followedNickname: string }[];
}
interface UnfollowRequest {
  followerId: number;
}

interface UnfollowResponse {
  data: unknown;
  headers: {
    authorization: string;
  };
}

interface FollowsResponse {
  snippet: [{ id: number; followedUserId: string; followedNickname: string }];
}

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi', // 상태 이름 (리듀서 이름)
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem('access_token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Authorization 헤더 추가
      }
      return headers;
    },
  }), // API 기본 URL 설정
  endpoints: builder => ({
    addSubscription: builder.mutation<FollowResponse, FollowRequest>({
      query: ({ followerId }) => ({
        url: 'v1/follow',
        method: 'POST',
        params: { followerId },
      }),
    }),

    removeSubscription: builder.mutation<UnfollowResponse, UnfollowRequest>({
      query: ({ followerId }) => ({
        url: `v1/follow`,
        method: 'DELETE',
        params: { followerId },
      }),
    }),

    getSubscriptions: builder.query<FollowsResponse, void>({
      query: () => ({
        url: `v1/follow/followings`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddSubscriptionMutation, useRemoveSubscriptionMutation, useGetSubscriptionsQuery } = subscriptionApi;
