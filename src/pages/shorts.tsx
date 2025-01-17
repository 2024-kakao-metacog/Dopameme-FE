import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Player from '../components/Player';

import { ReactComponent as NextButton } from '../assets/next_video_button.svg';
import { ReactComponent as PrevButton } from '../assets/prev_video_button.svg';

function App() {
  const [searchParams] = useSearchParams();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    // Get the window height and calculate the width based on a 9:16 ratio
    const height = window.innerHeight;
    const width = (height * 9) / 16;
    setDimensions({ width, height });
  };

  useEffect(() => {
    // Set initial dimensions
    updateDimensions();

    // Add event listener to handle window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // URL에서 쿼리 파라미터 가져오기
  const videoData = {
    src: searchParams.get('videoUrl') || '', // 기본값 설정
    title: searchParams.get('title') || 'Untitled Video', // 제목도 URL에서 가져올 경우
  };

  return (
    <div className="bg-dopameme-bg flex size-full items-center justify-center">
      {/* 영상존 div */}
      <div className="relative flex min-h-[510px] min-w-[294px]  justify-center p-4" style={{ width: dimensions.width, height: dimensions.height }}>
        {/* 동영상 div */}
        <div className="relative flex aspect-[9/16] overflow-hidden  rounded-lg">
          {videoData.src ? <Player src={videoData.src} autoplay={false} /> : <div className="flex size-full items-center justify-center bg-gray-500 text-white">No Video Available</div>}
          {/* 메타데이터 정보 표시 */}
          <div className="absolute bottom-2 z-10 w-full max-w-full space-y-2 rounded px-5 py-4 text-white">
            <div className="flex items-center">
              <div className="overflow-hidden truncate pr-3 text-lg font-bold">업로드 채널</div>
              <button className="rounded-full bg-white px-4 py-1 text-sm text-black hover:bg-gray-200">구독</button>
            </div>
            <div className="overflow-hidden truncate text-xl">{videoData.title}</div>
          </div>
        </div>
      </div>
      {/* 버튼존 */}
      <div className="flex flex-col items-center justify-center space-y-8 pl-4">
        {/* 삼각형 버튼 */}
        <button className="hover:opacity-60">
          <PrevButton className="size-[60px]" />
        </button>
        {/* 역 삼각형 버튼 */}
        <button className="hover:opacity-60">
          <NextButton className="size-[60px]" />
        </button>
      </div>
    </div>
  );
}

export default App;
