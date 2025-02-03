import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Player from '../components/Player'; // Player 컴포넌트를 가져옵니다.
import { Video } from '../types/Video';
import API_URL from '../config/env';
import { RootState } from '../Redux/store/store';
import { useSelector } from 'react-redux';
import { useAddSubscriptionMutation, useRemoveSubscriptionMutation } from '../Redux/slice/subApi';

interface ParentContext {
  updateRenderKey: () => void;
}

function Shorts() {
  const { currentVideo } = useOutletContext<{ currentVideo: Video }>();
  const { videoUrl } = useParams();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [addSubscription] = useAddSubscriptionMutation();
  const [removeSubscription] = useRemoveSubscriptionMutation();
  const { updateRenderKey } = useOutletContext<ParentContext>();
  const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);

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

  const userId = currentVideo.userId;
  const followId = subscriptions.find(sub => sub.followedUserId === userId)?.id;

  const subscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      navigate('/login');
      return;
    }
    try {
      await addSubscription({ targetUserId: userId }).unwrap();
      updateRenderKey();
    } catch (err) {
      console.error('구독 실패:', err);
    }
  };

  const unsubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (followId) {
      try {
        await removeSubscription({ followId }).unwrap();
        updateRenderKey();
      } catch (err) {
        console.error('구독 취소 실패:', err);
      }
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
            {followId ? (
              <button onClick={unsubscribeSubmit} className="rounded-full bg-menubar-highlight px-4 py-1 text-sm text-white">
                구독중
              </button>
            ) : (
              <button onClick={subscribeSubmit} className="rounded-full bg-white px-4 py-1 text-sm text-black hover:bg-gray-200">
                구독
              </button>
            )}
          </div>
          <div className="overflow-hidden truncate text-base">{videoData.title}</div>
        </div>
      </div>
    </div>
  );
}

export default Shorts;
