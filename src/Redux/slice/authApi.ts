import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../config/env';

interface LoginRequest {
  userId: string;
  password: string;
}

interface LoginResponse {
  data: unknown;
  headers: {
    authorization: string;
  };
}

interface SignupRequest {
  userId: string;
  password: string;
  nickname: string;
}

interface SignupResponse {
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: 'include' }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'v1/auth',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: LoginResponse, meta) => {
        // 헤더 정보를 추출하여 리턴
        const authorization = meta?.response?.headers?.get('authorization') || '';
        return {
          data: response,
          headers: { authorization },
        };
      },
    }),
    register: builder.mutation<SignupResponse, SignupRequest>({
      query: userData => ({
        url: 'v1/user',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
