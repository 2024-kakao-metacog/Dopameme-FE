import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addVideos } from './videoSlice'; // Slice의 액션
import API_URL from '../config/env';

export interface Video {
  videoId: string; // 비디오 ID
  title: string; // 제목
  videoUrl: string; // 비디오 URL
  thumbnailUrl: string; // 썸네일 URL
  publishedAt: number; // 게시 날짜 (Unix 타임스탬프)
  userId: string; // 사용자 ID
  userNickname: string; // 사용자 닉네임
  isOwner: boolean; // 현재 사용자가 소유자인지 여부
  isSubscribed: boolean; // 구독 여부
  canSubscribe: boolean; // 구독 가능 여부
}

interface VideoApiResponseItem {
  snippet: {
    videoId: string; // 비디오 ID
    title: string; // 제목
    videoUrl: string; // 비디오 URL
    thumbnailUrl: string; // 썸네일 URL
    publishedAt: number; // 게시 날짜 (Unix 타임스탬프)
    userId: string; // 사용자 ID
    userNickname: string; // 사용자 닉네임
    isOwner: boolean; // 현재 사용자가 소유자인지 여부
    isSubscribed: boolean; // 구독 여부
    canSubscribe: boolean; // 구독 가능 여부
  };
}

// RTK Query API 정의
export const videoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL, // .env 파일에서 가져온 API URL
  }),
  endpoints: builder => ({
    getVideos: builder.query<Video[], void>({
      query: () => '', // API 엔드포인트 경로
      transformResponse: (response: VideoApiResponseItem[]): Video[] => {
        return response
          .filter(item => item.snippet)
          .map(item => ({
            videoId: item.snippet.videoId,
            title: item.snippet.title,
            videoUrl: item.snippet.videoUrl,
            thumbnailUrl: item.snippet.thumbnailUrl,
            publishedAt: item.snippet.publishedAt,
            userId: item.snippet.userId,
            userNickname: item.snippet.userNickname,
            isOwner: item.snippet.isOwner,
            isSubscribed: item.snippet.isSubscribed,
            canSubscribe: item.snippet.canSubscribe,
          }));
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addVideos(data)); // Slice로 데이터 저장
        } catch (error) {
          console.error('Failed to fetch and save videos:', error);
        }
      },
    }),
  }),
});

export const { useGetVideosQuery } = videoApi;
