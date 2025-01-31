import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types/Video';
import VideoBotton from './VideoBotton';
import API_URL from '../config/env';

interface VideoCardProps {
  video: Video;
}

function VideoCard({ video }: VideoCardProps) {
  const shortVideoUrl = video.videoUrl;
  const VIDEO_RUL = `${API_URL}v1/videostream/${video.videoUrl}/manifest.mpd`;

  return (
    <div className="flex h-full w-1/4 items-center justify-center px-2">
      <div className="flex h-auto w-full flex-col space-y-2">
        <div className="flex aspect-[9/16] h-auto w-full overflow-hidden rounded-xl">
          <Link to={`/shorts/${shortVideoUrl}`} state={{ video }}>
            <VideoBotton videoUrl={VIDEO_RUL} thumbnailUrl={video.thumbnailUrl} />
          </Link>
        </div>
        <div className="flex h-auto w-full pl-2.5 pr-10 text-lg text-white">
          <span className="overflow-hidden truncate">{video.title}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
