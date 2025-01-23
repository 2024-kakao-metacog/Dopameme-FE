import axios from 'axios';
import API_URL from '../config/env';
import { Video } from '../types/Video';

interface VideoApiResponse {
  snippet: Video;
  videoUrl: Video['videoUrl']; // Video의 videoUrl 속성만 재사용
  userId: Video['userId']; // Video의 videoId 속성만 재사용
}

// 메타데이터를 파싱하는 함수
// function parseVideoMetadata(data: VideoApiResponse[]): Video[] {
//   return data.map(data => ({
//     title: data.snippet.title,
//     videoUrl: data.snippet.videoUrl,
//     thumbnailUrl: data.snippet.thumbnailUrl,
//     publishedAt: new Date(data.snippet.publishedAt).toISOString(),
//     userId: data.snippet.userId,
//     userNickname: data.snippet.userNickname,
//     isOwner: data.snippet.isOwner,
//     isSubscribed: data.snippet.isSubscribed,
//     canSubscribe: data.snippet.canSubscribe,
//   }));
// }

// 단일 메타데이터를 파싱하는 함수
function parseSingleVideoMetadata(data: VideoApiResponse): Video {
  return {
    title: data.snippet.title,
    videoUrl: data.snippet.videoUrl,
    thumbnailUrl: data.snippet.thumbnailUrl,
    publishedAt: new Date(data.snippet.publishedAt).toISOString(),
    userId: data.snippet.userId,
    userNickname: data.snippet.userNickname,
    isOwner: data.snippet.isOwner,
    isSubscribed: data.snippet.isSubscribed,
    canSubscribe: data.snippet.canSubscribe,
  };
}

// 동영상 메타데이터를 가져오는 함수
async function fetchVideoMetadata(count: number): Promise<Video[]> {
  try {
    const response = await axios.get(`${API_URL}v1/video/metadatas/random?maxResults=${count}`);
    return response.data.snippet; // snippet 배열만 반환
  } catch (error) {
    console.error('Error in fetchVideoMetadata:', error);
    throw error;
  }
}

// URL로 메타데이터를 가져오는 함수
async function fetchVideoMetadataByUrl(videoUrl: string): Promise<Video | null> {
  try {
    const response = await axios.get<VideoApiResponse>(`${API_URL}v1/video/metadata?videoUrl=${encodeURIComponent(videoUrl)}`);
    return parseSingleVideoMetadata(response.data); // 단일 메타데이터 파싱 후 반환
  } catch (error) {
    console.error('Error fetching video metadata by URL:', error);
    return null;
  }
}

// 유저 아이디로 그 유저의 동영상 메타데이터만 가져오는 함수
async function fetchVideoMetadataById(userId: string): Promise<Video[]> {
  try {
    const response = await axios.get(`${API_URL}v1/video/metadatas?userId=${userId}`);
    const snippet = response.data.snippet;

    if (!snippet) {
      // snippet이 null 또는 undefined인 경우
      return [];
    } else if (Array.isArray(snippet)) {
      // snippet이 배열인 경우
      return snippet;
    } else {
      // snippet이 단일 객체인 경우
      return [snippet];
    }
  } catch (error) {
    console.error('Error fetching video metadata by user ID', error);
    throw error;
  }
}

export { fetchVideoMetadata, fetchVideoMetadataByUrl, fetchVideoMetadataById };
