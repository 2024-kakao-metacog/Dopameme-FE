import React from 'react';
import VideoBotton from '../components/VideoBotton';

import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-row w-full h-full">
        {/* <Link>는 <a>와 동일한 역할 */}
        <div className="flex flex-col  inset-y-0 left-0 w-1/5 ">
          <Link to="/" className=" h-1/3 bg-dopameme-bg">
            <text className="text-kakao-yellow">main</text>
          </Link>
          <div className="h-1 bg-white"></div>
          <text className="w-full h-full bg-dopameme-bg text-kakao-yellow">메뉴바</text>
        </div>
        <div className="flex w-1 bg-white"></div>
        <div className="flex  p-[0.625rem] justify-center items-center space-x-[0.625rem] h-full w-full bg-dopameme-bg">
          <Link to="/shorts" className="rounded-lg overflow-hidden">
            <VideoBotton src="여기는 URL 자리" />
          </Link>
          <Link to="/shorts" className="rounded-lg overflow-hidden">
            <VideoBotton src="여기는 URL 자리" />
          </Link>
          <Link to="/shorts" className="rounded-lg overflow-hidden">
            <VideoBotton src="여기는 URL 자리" />
          </Link>
          <Link to="/shorts" className="rounded-lg overflow-hidden">
            <VideoBotton src="여기는 URL 자리" />
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
