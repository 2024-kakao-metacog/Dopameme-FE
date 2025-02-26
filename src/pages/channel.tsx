import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { RootState } from '../Redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../Redux/slice/authSlice';
import { fetchVideoMetadataById } from '../api/videoApi';
import { Video } from '../types/Video';
import VideoCard from '../components/VideoCard';
import { clearSubscriptions } from '../Redux/slice/subSlice';
import { useAddSubscriptionMutation, useRemoveSubscriptionMutation } from '../Redux/slice/subApi';
import axios from 'axios';
import API_URL from '../config/env';

interface ParentContext {
  updateRenderKey: () => void;
}

function App() {
  const { id: userId } = useParams<{ id: string }>();
  const { id: myId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [curIndex, setCurrentIndex] = useState(0); // 현재 첫 번째 비디오 인덱스
  const [addSubscription] = useAddSubscriptionMutation();
  const [removeSubscription] = useRemoveSubscriptionMutation();
  const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { updateRenderKey } = useOutletContext<ParentContext>();
  const [nickname, setNickname] = useState<string>('');

  const MAX_ITEMS = 4; // 한 번에 보이는 비디오 수

  const followId = subscriptions.find(sub => sub.followedUserId === userId)?.id;

  const fetchUserNickname = async () => {
    try {
      // API 호출을 통해 닉네임 정보 가져오기
      const response = await axios.get(`${API_URL}v1/user`, {
        params: { userId: userId },
      });
      setNickname(response.data.snippet.nickname);
    } catch (error) {
      console.error('닉네임 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (!videos || videos.length === 0) {
      fetchUserNickname();
    } else {
      setNickname(videos[0].userNickname);
    }
  }, [videos]);

  const subscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      navigate('/login');
      return;
    } else if (userId) {
      try {
        await addSubscription({ targetUserId: userId }).unwrap();
        updateRenderKey();
      } catch (err) {
        console.error('구독 실패:', err);
      }
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

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(clearSubscriptions());
    alert('로그아웃되었습니다.');
  };

  // 비디오 메타데이터 로드
  useEffect(() => {
    if (!userId) {
      setIsError(true); // userId가 없는 경우 에러 처리
      return;
    }

    const loadVideos = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVideoMetadataById(userId);

        setVideos(data); // 모든 비디오 메타데이터를 배열에 저장
      } catch (error) {
        console.error('Error fetching videos:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [userId]);

  // 휠 이벤트 핸들러
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault(); // 기본 휠 스크롤 동작 방지

    if (e.deltaY > 0) {
      // 아래로 스크롤: 다음 비디오 세트로 이동
      if (curIndex + MAX_ITEMS < videos.length) {
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      // 위로 스크롤: 이전 비디오 세트로 이동
      if (curIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  if (isLoading) return <p>Loading videos...</p>;
  if (isError) return <p>Error loading videos!</p>;

  return (
    <div className="flex size-full flex-col">
      {/* header */}
      <div className="flex h-32 min-h-32 w-full items-center border-b-2 border-white">
        <div className="flex h-full items-center pl-14 pr-3 text-4xl font-bold text-white">{nickname}</div>
        {userId !== myId &&
          (followId ? (
            <button onClick={unsubscribeSubmit} className="rounded-full bg-menubar-highlight px-4 py-1 text-sm text-white">
              구독중
            </button>
          ) : (
            <button onClick={subscribeSubmit} className="rounded-full bg-white px-4 py-1 text-sm text-black hover:bg-gray-200">
              구독
            </button>
          ))}

        {userId === myId && (
          <div className="flex h-full items-center">
            <button className="border-b-2 border-dopameme-bg text-white hover:border-white" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
      {/* contents */}
      <div className="flex size-full flex-col items-center justify-center scrollbar-hide">
        <div
          className="flex h-auto w-full min-w-[64rem] max-w-[92rem] flex-row justify-center overflow-hidden transition-all duration-500" // 가로 스크롤 숨김
          onWheel={handleWheel} // 휠 이벤트
        >
          {videos.slice(curIndex, curIndex + MAX_ITEMS).map(video => (
            <VideoCard key={video.videoUrl} video={video} />
          ))}
        </div>
        {/* 점(Indicator) 표시 */}
        <div className="mt-2 flex space-x-2">
          {Array.from({ length: Math.ceil(videos.length / MAX_ITEMS - 1) }).map((_, index) => (
            <div key={index} className={`size-2 rounded-full ${index === Math.floor(curIndex / MAX_ITEMS) ? 'bg-white' : 'bg-gray-500'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
