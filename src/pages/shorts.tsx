import React from 'react';
import Player from '../components/Player';
function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center ">
      {/* Tailwind로 비율 유지 및 최대 크기 설정 */}
      <div className="relative">
        <div className="absolute bottom-6 left-1 z-10 rounded-lg px-4 py-2 text-white" style={{ fontSize: '1.5vw' }}>
          이것은 제목입니다
        </div>
        <Player src="" autoplay={false} />
      </div>
    </div>
  );
}

export default App;
