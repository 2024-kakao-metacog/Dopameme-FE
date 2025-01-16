import React from 'react';
import { Link } from 'react-router-dom';
import VideoBotton from '../components/VideoBotton';

interface VideoCard {
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

interface VideoCardProps {
  video: VideoCard | null; // 비디오가 없을 수도 있으므로 null 허용
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="flex h-full w-1/4 items-center justify-center px-2">
      <div className="flex h-auto w-full flex-col space-y-2">
        {/* 비디오 버튼 */}
        <div className="flex aspect-[9/16] h-auto w-full overflow-hidden rounded-xl">
          <Link to={`/shorts?videoUrl=${encodeURIComponent(video?.videoUrl || '')}`}>
            {video ? <VideoBotton videoUrl={video.videoUrl} thumbnailUrl={video.thumbnailUrl} /> : <span className="bg-gray-500 text-white">No Video</span>}
          </Link>
        </div>

        {/* 제목 */}
        <div className="flex h-auto w-full pl-2.5 pr-10 text-sm text-white md:text-lg lg:text-xl">
          <span className="overflow-hidden truncate">{video?.title || 'Empty Slot'}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
