import React from 'react';
import { ReactComponent as Logo } from '../assets/logo_main.svg';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-screen w-screen items-center overflow-hidden bg-dopameme-bg">
      {/* menu bar */}
      <div className="flex h-full w-[200px] flex-col border-r-2 border-white px-4 py-3">
        <div className="overflow-auto scrollbar-hide">
          <Logo className="min-h-[60px]" />
          {/* tabs */}
          <div className="mt-4">
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">업로드</div>
            </Link>
            <Link to="/login">
              <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">로그인</div>
            </Link>
            <Link to="/notice">
              <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">알림</div>
            </Link>
          </div>
          <hr className="my-4 border-t-2" />
          {/* sub list */}
          <div>
            <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow">구독</div>

            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">선쩔티비</div>
            </Link>
          </div>
        </div>
      </div>
      {/* contents area */}
      <div className="size-full flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
