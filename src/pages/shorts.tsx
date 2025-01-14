import React from 'react';
import Player from '../components/Player';
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      {/* Tailwind로 비율 유지 및 최대 크기 설정 */}
      <div className="relative">
        <div className="absolute bottom-6 left-1 text-white px-4 py-2 rounded-lg z-10" style={{ fontSize: '1.5vw' }}>
          이것은 제목입니다
        </div>
        <Player src="여기는 URL 자리" autoplay={false} />
      </div>
    </div>
  );
}

export default App;
