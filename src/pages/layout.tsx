import React, { useEffect } from 'react';
import { ReactComponent as Logo } from '../assets/logo_main.svg';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RootState } from '../Redux/store/store';
import { useSelector } from 'react-redux';
import { getInfoByToken } from '../utils/setUserInfo';
import { useAppDispatch } from '../Redux/rtkHooks';
import { useGetSubscriptionsQuery } from '../Redux/slice/subApi';

function App() {
  const { accessToken, nickname, id } = useSelector((state: RootState) => state.auth);
  const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions); // 구독 목록 가져오기
  const dispatch = useAppDispatch();
  const { data } = useGetSubscriptionsQuery();

  console.log('구독리스트', data?.snippet);
  useEffect(() => {
    // accessToken이 null일 때만 getInfoByToken 실행
    if (!accessToken || !id || !nickname) {
      console.log('데이터 패치');
      dispatch(getInfoByToken());
    }
  }, [dispatch, accessToken, id, nickname]);

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden bg-dopameme-bg">
      {/* menu bar */}
      <div className="h-full w-[200px] min-w-[200px] flex-col border-r-2 border-white px-4 py-3">
        <div className="overflow-auto scrollbar-hide">
          <Link to="/main">
            <Logo className="min-h-[60px]" />
          </Link>
          {/* tabs */}
          <div className="mt-4">
            <Link to="/upload">
              <div className="mb-1 rounded-md p-1 text-base font-bold text-kakao-yellow hover:bg-menubar-highlight">업로드</div>
            </Link>
            {accessToken ? (
              <Link to={`/${id}`}>
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
                <Link key={subscription.followedUserId} to={`/${subscription.followedUserId}`}>
                  <div className="mb-1 rounded-md p-1 text-base font-normal text-white hover:bg-menubar-highlight">
                    {subscription.followedNickname} {/* 채널 이름으로 닉네임 사용 */}
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
      <div className="h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
