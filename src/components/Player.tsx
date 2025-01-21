import React, { useRef, useEffect, useState } from 'react';
import styles from '../data/player.module.css';
import dashjs from 'dashjs';
import { ReactComponent as Mute } from '../assets/mute.svg';
import { ReactComponent as LowVolume } from '../assets/low_volume.svg';
import { ReactComponent as HighVolume } from '../assets/high_volume.svg';
import { ReactComponent as VideoPlay } from '../assets/video_play.svg';
import { ReactComponent as VideoStop } from '../assets/video_stop.svg';

interface PlayerProps {
  src: string;
  autoplay?: boolean;
}

function Player({ src, autoplay = false }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [mousePosition, setMousePosition] = useState<'top' | 'middle' | 'bottom' | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // videoRef.current를 로컬 변수에 저장
    const videoElement = videoRef.current;

    if (videoElement) {
      // Dash.js 플레이어 초기화
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoElement, src, autoplay);

      // 비디오 설정
      videoElement.muted = false;
      videoElement.volume = 1;

      // 메타데이터 로드 시 핸들러
      const handleLoadedMetadata = () => {
        setDuration(videoElement.duration);
      };

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Autoplay 설정
      if (autoplay) {
        setTimeout(() => {
          videoElement
            .play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error('Autoplay failed:', error));
        }, 100);
      }

      // 클린업 함수
      return () => {
        player.destroy();
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [src, autoplay]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const height = rect.height;

    if (relativeY < height * 0.2) {
      setMousePosition('top');
    } else if (relativeY > height * 0.8) {
      setMousePosition('bottom');
    } else {
      setMousePosition('middle');
    }

    setShowControls(true);

    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }

    if (relativeY >= height * 0.2 && relativeY <= height * 0.8) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1500); // 1.5초 뒤에 사라짐
    }
  }

  function togglePlayPause() {
    if (videoRef.current) {
      setShowPlayPauseButton(true);
      setTimeout(() => setShowPlayPauseButton(false), 1000);

      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true));
      }
    }
  }

  function handleTimeUpdate() {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  function handleSeek(event: React.ChangeEvent<HTMLInputElement>) {
    if (videoRef.current) {
      const seekTime = parseFloat(event.target.value);
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  }

  // function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const newVolume = parseFloat(event.target.value);
  //   if (videoRef.current) {
  //     videoRef.current.volume = newVolume;
  //     videoRef.current.muted = newVolume === 0;
  //   }
  //   setPreviousVolume(newVolume > 0 ? newVolume : previousVolume);
  //   setVolume(newVolume);
  // }

  const handleVideoEnded = () => {
    if (videoRef.current) {
      setIsPlaying(true); // 재생 상태로 설정
      videoRef.current.currentTime = 0; // 재생 위치를 처음으로 설정
      setTimeout(() => {
        videoRef.current
          ?.play()
          .then(() => setIsPlaying(true)) // 재생 성공 시 재생 상태로 유지
          .catch(() => setIsPlaying(false)); // 재생 실패 시 일시정지 상태로 설정
      }, 50); // 50ms 지연 후 재생 시도
    }
  };

  // function formatTime(time: number): string {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  // }

  function toggleMute() {
    if (videoRef.current) {
      console.log('Before toggle:', {
        muted: videoRef.current.muted,
        volume: videoRef.current.volume,
        previousVolume,
        currentVolume: volume,
      });

      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        const restoredVolume = previousVolume > 0 ? previousVolume : 0.1;
        videoRef.current.volume = restoredVolume;
        setVolume(restoredVolume);
      } else {
        videoRef.current.muted = true;
        setPreviousVolume(volume > 0 ? volume : previousVolume);
        setVolume(0);
      }
    }
  }

  function handleMouseLeavePlayer() {
    setShowControls(false);
    setShowVolumeSlider(false);
  }

  return (
    <div className="relative size-full overflow-hidden rounded-lg bg-black shadow-lg" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeavePlayer}>
      {/* Video Element */}
      <video ref={videoRef} className="size-full object-cover" onTimeUpdate={handleTimeUpdate} onClick={togglePlayPause} onEnded={handleVideoEnded} autoPlay={autoplay} />

      {/* Central Play/Pause Button */}
      <button
        className={`absolute left-1/2 top-1/2 flex size-[6.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-[3rem] text-kakao-yellow transition-opacity duration-1000 ${
          showPlayPauseButton ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={togglePlayPause}
      >
        {isPlaying ? <VideoPlay /> : <VideoStop />}
      </button>

      {/* Volume Control - 상단 */}
      <div
        className={`absolute inset-x-0 top-0 p-2 transition-opacity duration-700 ${mousePosition === 'top' && showControls ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <div className={`flex items-center space-x-4 rounded-full bg-black/50 transition-all duration-700 ${showVolumeSlider ? 'p-2 sm:w-32 md:w-48 lg:w-64' : 'w-12 p-2'}`}>
          {/* Mute Button */}
          <button onClick={toggleMute} className="flex size-8 items-center justify-center rounded-full p-2 text-white transition hover:bg-gray-500">
            {videoRef.current?.muted ? (
              // 뮤트O SVG
              <Mute />
            ) : volume <= 0.5 ? (
              // 뮤트X 볼륨 0.5 이하 SVG
              <LowVolume />
            ) : (
              // 뮤트X 볼륨 0.5 초과 SVG
              <HighVolume />
            )}
          </button>

          {/* Volume Slider */}
          <input
            type="range"
            className={styles['custom-slider']}
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={e => {
              const newVolume = parseFloat(e.target.value);
              if (videoRef.current) {
                videoRef.current.volume = newVolume;
                videoRef.current.muted = newVolume === 0; // 음소거 처리
              }
              setPreviousVolume(newVolume > 0 ? newVolume : previousVolume);
              setVolume(newVolume);
            }}
            style={
              {
                '--value': `${volume * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      {/* Video Progress Bar - 하단 */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 p-1 text-white transition-opacity duration-1000 ${
          mousePosition === 'bottom' && showControls ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center space-x-4">
          <input
            type="range"
            className={styles['custom-slider']}
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            style={
              {
                '--value': `${(currentTime / duration) * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-black/70 to-black/0"></div>
    </div>
  );
}

export default Player;
