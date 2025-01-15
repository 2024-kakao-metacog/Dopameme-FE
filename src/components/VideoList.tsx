import React from 'react';
import { useGetVideosQuery } from '../Redux/videoApi'; // RTK Query 훅 가져오기

function VideoList() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.error('Error:', error); // 오류 정보를 콘솔에 출력
    return <p>Error loading videos! Please check the console for details.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos?.map(video => (
        <div key={video.videoId} className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold">{video.title}</h2>
          <p className="text-sm text-gray-500">{video.userNickname}</p>
          <video src={video.videoUrl} className="w-full h-auto" controls />
        </div>
      ))}
    </div>
  );
}

export default VideoList;
