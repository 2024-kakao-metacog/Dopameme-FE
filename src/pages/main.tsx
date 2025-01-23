import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchVideoMetadata } from '../api/videoApi'; // Axios 및 메타데이터 파싱 함수
import VideoCard from '../components/VideoCard';
import { Video } from '../types/Video';

function Main() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVideoMetadata(5); // 4개의 메타데이터 요청
        console.log('Fetched video metadata:', data); // 메타데이터 출력
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadVideos();
  }, []);

  if (isLoading) return <p>Loading videos...</p>;
  if (isError) return <p>Error loading videos!</p>;

  return (
    <div className="flex size-full items-center justify-center bg-dopameme-bg">
      <div className="flex size-full min-w-[64rem] max-w-[92rem] flex-row items-center justify-center p-4">
        {videos.map(video => (
          <VideoCard key={video.videoUrl} video={video} />
        ))}
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
