import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addVideos } from './videoSlice'; // Slice의 액션
import API_URL from '../../config/env';
import { Video } from '../../types/Video'; // 비디오 정보 타입

interface VideoApiPorps {
  snippet: Video;
}

// RTK Query API 정의
export const videoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + 'v1/video/metadata/list',
  }),
  endpoints: builder => ({
    getVideos: builder.query<Video[], void>({
      query: () => '',
      transformResponse: (response: VideoApiPorps[]): Video[] => {
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
