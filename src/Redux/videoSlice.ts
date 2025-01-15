import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Video {
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

interface VideoState {
  videos: Video[];
}

const initialState: VideoState = {
  videos: [],
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    addVideos(state, action: PayloadAction<Video[]>) {
      // 중복 제거 로직
      const newVideos = action.payload.filter(newVideo => !state.videos.some(video => video.videoId === newVideo.videoId));
      state.videos = [...state.videos, ...newVideos];
    },
  },
});

export const { addVideos } = videoSlice.actions;

export default videoSlice.reducer;
