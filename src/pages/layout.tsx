import React from 'react';
import { ReactComponent as Logo } from '../assets/logo_main.svg';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RootState } from '../Redux/store/store';
import { useSelector } from 'react-redux';

function App() {
  const { token, nickname } = useSelector((state: RootState) => state.auth);
  const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions); // 구독 목록 가져오기

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden bg-dopameme-bg">
      {/* menu bar */}
      <div className="flex h-full w-[200px] flex-col border-r-2 border-white px-4 py-3">
        <div className="overflow-auto scrollbar-hide">
          <Link to="/main">
            <Logo className="min-h-[60px]" />
          </Link>
          {/* tabs */}
          <div className="mt-4">
            <Link to="/main">
              <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">업로드</div>
            </Link>
            {token ? (
              <Link to="/notice">
                <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">{nickname}</div>
              </Link>
            ) : (
              <Link to="/login">
                <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">로그인</div>
              </Link>
            )}

            <Link to="/notice">
              <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">알림</div>
            </Link>
          </div>
          <hr className="my-4 border-t-2" />
          {/* sub list */}
          <div>
            <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow">구독</div>
            <Link key="test" to="testId">
              <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">test nickname {/* 채널 이름으로 닉네임 사용 */}</div>
            </Link>
            {subscriptions && subscriptions.length > 0 ? (
              subscriptions.map(subscription => (
                <Link key={subscription.id} to={`/${subscription.id}`}>
                  <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">
                    {subscription.nickname} {/* 채널 이름으로 닉네임 사용 */}
                  </div>
                </Link>
              ))
            ) : (
              <div className="mb-1 rounded-md p-1 text-sm font-normal text-white">구독한 채널이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
      {/* contents area */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
