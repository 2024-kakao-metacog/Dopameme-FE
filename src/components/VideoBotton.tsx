import React, { useRef, useEffect, useState } from 'react';
import dashjs from 'dashjs';

// 컴포넌트 속성 정의
interface VideoPlayerProps {
  videoUrl: string; // MPEG-DASH URL
  thumbnailUrl: string; // 썸네일 URL
}

function DashVideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null); // 비디오 요소를 참조하기 위한 useRef 사용
  const [isHovered, setIsHovered] = useState(false); // 마우스 오버 상태 관리

  useEffect(() => {
    let player: dashjs.MediaPlayerClass | null = null; // dash.js 플레이어 초기화 변수

    if (isHovered && videoRef.current && videoUrl) {
      // dash.js 플레이어 생성 및 초기화
      player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, videoUrl, false);

      // 비디오 음소거
      videoRef.current.muted = true;

      return () => {
        player?.destroy(); // 컴포넌트 언마운트 시 플레이어 리소스 정리
      };
    }
  }, [isHovered, videoUrl]); // isHovered 또는 videoUrl 변경 시 effect 실행

  // 마우스 오버 시 비디오를 처음부터 재생
  const handleMouseOver = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // 비디오 재생 위치를 처음으로 설정
      videoRef.current.play().catch(error => console.error('Error during play:', error)); // 재생 중 오류 처리
    }
  };

  // 마우스가 떠날 때 비디오를 일시 정지
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="relative size-full cursor-pointer"
      onMouseOver={handleMouseOver} // 마우스 오버 이벤트 핸들러
      onMouseLeave={handleMouseLeave} // 마우스 리브 이벤트 핸들러
    >
      {isHovered ? (
        // 마우스 오버 상태에서는 비디오를 렌더링
        <video
          ref={videoRef}
          className="size-full object-cover"
          loop // 비디오 반복 재생 설정
          playsInline // iOS 등에서 전체화면으로 전환되지 않도록 설정
        />
      ) : (
        // 마우스가 올라오기 전에는 썸네일 이미지를 렌더링
        <img src={thumbnailUrl} alt="thumbnail" className="size-full object-cover" />
      )}
    </div>
  );
}

export default DashVideoPlayer;
