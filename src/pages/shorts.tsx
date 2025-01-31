import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Player from '../components/Player'; // Player 컴포넌트를 가져옵니다.
import { Video } from '../types/Video';
import API_URL from '../config/env';
import { RootState } from '../Redux/store/store';
import { useSelector } from 'react-redux';

function Shorts() {
  const { currentVideo } = useOutletContext<{ currentVideo: Video }>();
  const { videoUrl } = useParams();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (!currentVideo) {
    return (
      <div className="flex size-full items-center justify-center text-white">
        <p>No video data found for this URL: {videoUrl}</p>
      </div>
    );
  }

  const videoData = {
    src: API_URL + 'v1/videostream/' + currentVideo.videoUrl + '/manifest.mpd',
    title: currentVideo.title,
    channelName: currentVideo.userNickname,
  };

  const subscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      navigate('/login');
      return;
    }
  };

  return (
    <div className="flex size-full">
      {/* 동영상 div */}
      <div className="relative flex aspect-[9/16] overflow-hidden rounded-lg">
        {videoData.src ? <Player src={videoData.src} autoplay /> : <div className="flex size-full items-center justify-center bg-gray-500 text-white">No Video Available</div>}
        {/* 메타데이터 정보 표시 */}
        <div className="absolute bottom-2 z-10 w-full max-w-full space-y-2 rounded px-5 py-4 text-white">
          <div className="flex items-center">
            <div className="overflow-hidden truncate pr-3 text-lg font-bold">{videoData.channelName}</div>
            <button onClick={subscribeSubmit} className="rounded-full bg-white px-4 py-1 text-sm text-black hover:bg-gray-200">
              구독
            </button>
          </div>
          <div className="overflow-hidden truncate text-xl">{videoData.title}</div>
        </div>
      </div>
    </div>
  );
}

export default Shorts;
