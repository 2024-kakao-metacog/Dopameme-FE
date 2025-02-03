import React, { useEffect, useState, useCallback } from 'react';
import { Outlet, useLocation, useParams, useNavigationType, useOutletContext } from 'react-router-dom';
import { Video } from '../types/Video';
import { fetchVideoMetadata, fetchVideoMetadataByUrl } from '../api/videoApi';
import { ReactComponent as NextButton } from '../assets/next_video_button.svg';
import { ReactComponent as PrevButton } from '../assets/prev_video_button.svg';

interface ParentContext {
  updateRenderKey: () => void;
}

function ShortsManager() {
  const location = useLocation();
  const { videoUrl } = useParams<{ videoUrl: string }>(); // videoUrl 파라미터 가져오기
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [curIndex, setCurIndex] = useState<number>(0); // 현재 인덱스 관리
  const [isScrolling, setIsScrolling] = useState<boolean>(false); // 스크롤 딜레이 상태
  const [translateY, setTranslateY] = useState<number>(0); // 애니메이션 Y축 이동값
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // 애니메이션 상태
  const { updateRenderKey } = useOutletContext<ParentContext>();

  // 현재 인덱스에 해당하는 비디오
  const curVideo = videoList[curIndex] || null;

  //새로고침 찾기위해 사용
  const navigationType = useNavigationType();

  // 창 크기 조절 이벤트 핸들러
  useEffect(() => {
    const updateDimensions = () => {
      const height = window.innerHeight;
      const width = (height * 9) / 16; // 9:16 비율
      setDimensions({ width, height });
    };

    updateDimensions(); // 초기 크기 설정
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // 전달된 상태를 확인하고 저장
  useEffect(() => {
    const video = location.state?.video;
    if (video) {
      setVideoList([video]);
    }
  }, [location.state]);

  // API 호출로 메타데이터 가져오기
  useEffect(() => {
    const loadVideoMetadata = async () => {
      try {
        const metadata = await fetchVideoMetadata(12);

        // 새로 고침일 때만 실행
        if (navigationType === 'POP' && videoUrl) {
          const videoFromUrl = await fetchVideoMetadataByUrl(videoUrl);
          if (videoFromUrl) {
            setVideoList(prevList => [videoFromUrl, ...prevList]); // 중복 방지
          }
        }

        setVideoList(prevList => [...prevList, ...metadata]);
        //setCurIndex(0);
      } catch (error) {
        console.error('Error fetching video metadata:', error);
      }
    };

    loadVideoMetadata();
  }, [videoUrl, navigationType]);

  useEffect(() => {
    if (curVideo) {
      window.history.pushState(null, '', `/shorts/${curVideo.videoUrl}`);
    }
  }, [curIndex, curVideo]);

  // videoUrl에 해당하는 인덱스 찾기
  useEffect(() => {
    if (videoUrl) {
      const index = videoList.findIndex(video => video.videoUrl === videoUrl);
      if (index >= 0) {
        setCurIndex(index); // videoUrl에 맞는 index로 curIndex 설정
      }
    }
  }, [videoUrl]); // videoList를 추가하면 curIndex가 0이 되어버리는 버그 발생

  // 이전 비디오로 이동
  const handlePrev = useCallback(() => {
    if (!isAnimating && curIndex > 0) {
      setIsAnimating(true);
      setTranslateY(100); // 위로 이동 애니메이션 시작

      setTimeout(() => {
        setCurIndex(prev => prev - 1); // 콘텐츠 교체
        setTranslateY(0); // 위치 초기화
        setIsAnimating(false);
      }, 500); // 애니메이션 지속 시간
    }
  }, [isAnimating, curIndex]);

  // 다음 비디오로 이동
  const handleNext = useCallback(() => {
    if (!isAnimating && curIndex < videoList.length - 1) {
      setIsAnimating(true);
      setTranslateY(-100); // 아래로 이동 애니메이션 시작

      setTimeout(() => {
        setCurIndex(prev => prev + 1); // 콘텐츠 교체
        setTranslateY(0); // 위치 초기화
        setIsAnimating(false);
      }, 500); // 애니메이션 지속 시간
    }
  }, [isAnimating, curIndex, videoList.length]);

  // videoList 길이가 curIndex + 2과 같으면 메타데이터 추가
  useEffect(() => {
    if (videoList.length - 2 === curIndex) {
      const loadAdditionalMetadata = async () => {
        try {
          const additionalMetadata = await fetchVideoMetadata(12);
          setVideoList(prevList => [...prevList, ...additionalMetadata]); // 추가 데이터를 기존 목록 뒤에 추가
        } catch (error) {
          console.error('Error fetching additional video metadata:', error);
        }
      };

      loadAdditionalMetadata();
    }
  }, [curIndex, videoList]); // curIndex만 의존

  // 스크롤 이벤트 추가
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 스크롤 딜레이 중이라면 무시
      if (isScrolling) return;

      if (event.deltaY > 0) {
        // 아래로 스크롤 -> 다음 비디오
        handleNext();
      } else if (event.deltaY < 0) {
        // 위로 스크롤 -> 이전 비디오
        handlePrev();
      }

      // 딜레이 시작
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false); // 딜레이 종료
      }, 500); // 500ms 딜레이
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isScrolling, handleNext, handlePrev]);

  // 키보드 이벤트 추가
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        handlePrev(); // 위쪽 방향키로 이전 비디오
      } else if (event.key === 'ArrowDown') {
        handleNext(); // 아래쪽 방향키로 다음 비디오
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrev, handleNext]);

  return (
    <div className="flex size-full items-center justify-center bg-dopameme-bg">
      {/* 영상존 div */}
      <div className="relative flex min-h-[510px] min-w-[294px] justify-center" style={{ width: dimensions.width, height: dimensions.height }}>
        {/* 이동 애니메이션 */}
        <div
          className="absolute flex size-full items-center justify-center px-4 py-6 transition-transform duration-300"
          style={{
            transform: `translateY(${translateY / 10}%)`, // Y축 이동
          }}
        >
          {/* 하위 컴포넌트로 상태 전달 */}
          <Outlet context={{ currentVideo: curVideo, updateRenderKey }} />
        </div>
      </div>
      {/* 탐색 버튼 */}
      <div className="flex flex-col items-center justify-center space-y-8 pl-4">
        {/* 이전 버튼 */}
        {curIndex > 0 && ( // curIndex가 0보다 클 때만 렌더링
          <button className="transition-all duration-500 hover:opacity-60" onClick={handlePrev}>
            <PrevButton className="size-[60px]" />
          </button>
        )}

        {/* 다음 버튼 */}
        <button className="transition-all duration-500 hover:opacity-60" onClick={handleNext}>
          <NextButton className="size-[60px]" />
        </button>
      </div>
    </div>
  );
}

export default ShortsManager;
