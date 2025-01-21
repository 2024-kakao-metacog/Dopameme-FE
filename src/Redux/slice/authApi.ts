import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../config/env';

interface LoginRequest {
  id: string;
  password: string;
}

interface LoginResponse {
  token: string;
  nickname: string;
  id: string;
}

interface SignupRequest {
  id: string;
  password: string;
  nickname: string;
}

interface SignupResponse {
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<SignupResponse, SignupRequest>({
      query: userData => ({
        url: '/signup',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
