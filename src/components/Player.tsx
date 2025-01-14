import React, { useRef, useEffect, useState } from 'react';
import styles from '../player.module.css';
import dashjs from 'dashjs';

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
    if (videoRef.current) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, src, autoplay);

      videoRef.current.muted = false;
      videoRef.current.volume = 1;

      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration);
        }
      };

      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      if (autoplay) {
        setTimeout(() => {
          videoRef.current
            ?.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error('Autoplay failed:', error));
        }, 100);
      }

      return () => {
        player.destroy();
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
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
    <div className="relative bg-black rounded-lg overflow-hidden shadow-lg w-full h-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeavePlayer}>
      {/* Video Element */}
      <video ref={videoRef} className="w-full h-full object-contain" onTimeUpdate={handleTimeUpdate} onClick={togglePlayPause} onEnded={handleVideoEnded} autoPlay={autoplay} />

      {/* Central Play/Pause Button */}
      <button
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-kakao-yellow text-[3rem] rounded-full w-[6.25rem] h-[6.25rem] flex items-center justify-center transition-opacity duration-1000 ${
          showPlayPauseButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="pointer-events-none w-12 h-12 fill-current" aria-hidden="true">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="pointer-events-none w-12 h-12 fill-current" aria-hidden="true">
            <path d="m7 4 12 8-12 8V4z"></path>
          </svg>
        )}
      </button>

      {/* Volume Control - 상단 */}
      <div
        className={`absolute top-0 left-0 right-0 p-2 transition-opacity duration-700 ${mousePosition === 'top' && showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <div className={`flex items-center space-x-4 rounded-full transition-all duration-700 bg-black/50 ${showVolumeSlider ? 'p-2 lg:w-64 md:w-48 sm:w-32' : 'p-2 w-12'}`}>
          {/* Mute Button */}
          <button onClick={toggleMute} className="flex items-center justify-center p-2 w-8 h-8 text-white rounded-full hover:bg-gray-500 transition">
            {videoRef.current?.muted ? (
              // 뮤트O SVG
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none w-8 h-8 fill-kakao-yellow">
                <path d="M14 9.71V7.62c2 .46 3.5 2.24 3.5 4.38 0 .58-.13 1.13-.33 1.64l-1.67-1.67c-.02-1.01-.63-1.88-1.5-2.26zM19 12c0 1-.26 1.94-.7 2.77l1.47 1.47C20.54 15.01 21 13.56 21 12c0-4.08-3.05-7.44-7-7.93v2.02c2.83.48 5 2.94 5 5.91zM3.15 3.85l4.17 4.17L6.16 9H3v6h3.16L12 19.93v-7.22l2 2v1.67c.43-.1.83-.27 1.2-.48l1.09 1.09c-.68.45-1.45.78-2.28.92v2.02c1.39-.17 2.66-.71 3.73-1.49l2.42 2.42.71-.71-17-17-.72.7zm8.85.22L9.62 6.08 12 8.46V4.07z"></path>
              </svg>
            ) : volume <= 0.5 ? (
              // 뮤트X 볼륨 0.5 이하 SVG
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none w-8 h-8 fill-kakao-yellow">
                <path d="M17.5 12c0 2.14-1.5 3.92-3.5 4.38v-2.09c.88-.39 1.5-1.27 1.5-2.29s-.62-1.9-1.5-2.29V7.62c2 .46 3.5 2.24 3.5 4.38zM3 9v6h3.16L12 19.93V4.07L6.16 9H3z"></path>
              </svg>
            ) : (
              // 뮤트X 볼륨 0.5 초과 SVG
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none w-8 h-8 fill-kakao-yellow">
                <path d="M21 12c0 4.08-3.05 7.44-7 7.93v-2.02c2.83-.48 5-2.94 5-5.91s-2.17-5.43-5-5.91V4.07c3.95.49 7 3.85 7 7.93zM3 9v6h3.16L12 19.93V4.07L6.16 9H3zm11-1.38v2.09c.88.39 1.5 1.27 1.5 2.29s-.62 1.9-1.5 2.29v2.09c2-.46 3.5-2.24 3.5-4.38S16 8.08 14 7.62z"></path>
              </svg>
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
        className={`absolute bottom-0 left-0 right-0 text-white p-1 transition-opacity duration-1000 ${
          mousePosition === 'bottom' && showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
    </div>
  );
}

export default Player;
