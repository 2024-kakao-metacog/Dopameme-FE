import React, { useRef, useEffect } from 'react';
import dashjs from 'dashjs';

// 컴포넌트 속성 정의
interface VideoPlayerProps {
  src: string; // MPEG-DASH URL
}

function DashVideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null); // 비디오 요소를 참조하기 위한 useRef 사용

  useEffect(() => {
    let player: dashjs.MediaPlayerClass | null = null; // dash.js 플레이어 초기화 변수

    if (videoRef.current && src) {
      // dash.js 플레이어 생성 및 초기화
      player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, src, false);

      // 비디오 음소거
      videoRef.current.muted = true;

      return () => {
        player?.destroy(); // 컴포넌트 언마운트 시 플레이어 리소스 정리
      };
    }
  }, [src]); // src가 변경될 때마다 effect 실행

  // 마우스 오버 시 비디오를 처음부터 재생
  const handleMouseOver = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // 비디오 재생 위치를 처음으로 설정
      videoRef.current.play().catch(error => console.error('Error during play:', error)); // 재생 중 오류 처리
    }
  };

  // 마우스가 떠날 때 비디오를 일시 정지
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // src가 제공되지 않았을 경우 오류 메시지 출력
  if (!src) {
    console.error('Video source URL is not provided or invalid.');
    return null; // 컴포넌트 렌더링 중단
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseOver={handleMouseOver} // 마우스 오버 이벤트 핸들러
      onMouseLeave={handleMouseLeave} // 마우스 리브 이벤트 핸들러
    >
      {/* 비디오 요소 */}
      <video
        ref={videoRef}
        className="w-full h-auto object-contain"
        loop // 비디오 반복 재생 설정
        playsInline // iOS 등에서 전체화면으로 전환되지 않도록 설정
      />
    </div>
  );
}

export default DashVideoPlayer;
