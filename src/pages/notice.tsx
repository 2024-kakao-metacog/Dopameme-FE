import React from 'react';

function App() {
  return (
    <div className="flex size-full flex-col">
      {/* header */}
      <div className="flex h-32 min-h-32 w-full items-center border-b-2 border-white">
        <div className="h-auto w-full pl-14 text-2xl font-bold text-white">알림</div>
      </div>
      {/* contents */}
      <div className="flex-1 p-6">
        <div className="flex size-full flex-col px-4">
          {/* notice container */}
          <div className="mb-2 flex h-32 w-full min-w-[700px] max-w-[1000px] rounded-lg bg-menubar-highlight p-3">
            {/* 동영상 정보  */}
            <div className="flex size-full flex-1 flex-col px-1.5">
              <div className="flex h-full overflow-hidden pb-4">
                <p className="line-clamp-2 text-2xl text-white">제목 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅁㄴㅁㄴㄻㅇㅁㄹㅊㅍㅌ퓬ㅇㅎㄹㅇㄻㄴㅇㅊㅌ</p>
              </div>
              <div className="flex h-auto w-full justify-between">
                <div className="truncate font-bold text-gray-400">백종원 PAIK JONG WON</div>
                <div className="flex">
                  <div className="font-bold text-gray-400">4시간 전</div>
                  <div className="ml-2 flex w-4 justify-center font-bold text-gray-400">:</div>
                </div>
              </div>
            </div>
            {/* 동영상 썸네일 */}
            <div className="ml-2 h-full w-44 bg-slate-200"></div>
          </div>
          <div className="mb-2 flex h-32 w-full min-w-[700px] max-w-[1000px] rounded-lg bg-menubar-highlight p-3">
            {/* 동영상 정보  */}
            <div className="flex size-full flex-1 flex-col px-1.5">
              <div className="flex h-full overflow-hidden pb-4">
                <p className="line-clamp-2 text-2xl text-white">제목 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅁㄴㅁㄴㄻㅇㅁㄹㅊㅍㅌ퓬ㅇㅎㄹㅇㄻㄴㅇㅊㅌ</p>
              </div>
              <div className="flex h-auto w-full justify-between">
                <div className="truncate font-bold text-gray-400">백종원 PAIK JONG WON</div>
                <div className="flex">
                  <div className="font-bold text-gray-400">4시간 전</div>
                  <div className="ml-2 flex w-4 justify-center font-bold text-gray-400">:</div>
                </div>
              </div>
            </div>
            {/* 동영상 썸네일 */}
            <div className="ml-2 h-full w-44 bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
