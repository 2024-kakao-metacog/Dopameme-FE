import axios from 'axios';
import API_URL from '../config/env';
import { Video } from '../types/Video';

interface VideoApiResponse {
  snippet: Video;
}

// 메타데이터를 파싱하는 함수
function parseVideoMetadata(data: VideoApiResponse[]): Video[] {
  return data.map(item => ({
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
}

// 동영상 메타데이터를 가져오는 함수
async function fetchVideoMetadata(count: number): Promise<Video[]> {
  try {
    const response = await axios.get<VideoApiResponse[]>(`${API_URL}v1/video/metadata/list?maxResults=${count}`);
    return parseVideoMetadata(response.data); // 메타데이터 파싱 후 반환
  } catch (error) {
    console.error('Failed to fetch video metadata:', error);
    return [];
  }
}

// videoUrl로 특정 비디오 메타데이터를 가짜 데이터로 반환
async function fetchVideoMetadataByUrl(videoUrl: string): Promise<Video | null> {
  // 실제 API에서 데이터를 가져오는 부분을 가정하겠습니다
  try {
    // 가짜 메타데이터를 반환합니다.
    const fakeVideo: Video = {
      videoId: 'dummy-video-id',
      title: 'Sample Video Title',
      videoUrl: videoUrl,
      thumbnailUrl: 'https://dummyimage.com/320x180/000/fff',
      publishedAt: Date.now(),
      userId: 'user123',
      userNickname: 'Dummy User',
      isOwner: false,
      isSubscribed: false,
      canSubscribe: true,
    };
    return fakeVideo;
  } catch (error) {
    console.error('Error fetching video metadata by URL:', error);
    return null;
  }
}

export { parseVideoMetadata, fetchVideoMetadata, fetchVideoMetadataByUrl };
