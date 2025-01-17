import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '../../types/Video';

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
