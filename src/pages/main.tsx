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
        const data = await fetchVideoMetadata(4); // 4개의 메타데이터 요청
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
      <div className="flex size-full min-w-[1024px] flex-row p-4">
        {videos.map((video, index) => (
          <VideoCard key={video.videoId || `placeholder-${index}`} video={video} />
        ))}
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
