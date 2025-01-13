import React from 'react';
import Player from '../components/Player';
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* Tailwind로 비율 유지 및 최대 크기 설정 */}
      <div className="relative w-[min(30vw,36rem)] aspect-[294/510]">
        <div className="absolute bottom-6 left-1 text-white px-4 py-2 rounded-lg z-10" style={{ fontSize: '1.5vw' }}>
          쇼미더머니 씹어먹는 썬라이즈
        </div>
        <Player
          src="http://localhost:8080/hObAvaxlQ7o.mp4-manifest.mpd" //"http://192.168.1.110:3001/v1/videostream/video?manifest=hObAvaxlQ7o.mp4"
          autoplay={false}
        />
      </div>
    </div>
  );
}

export default App;
