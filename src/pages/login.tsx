import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo_login.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../Redux/slice/authApi';

function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError }] = useLoginMutation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ userId, password }).unwrap();
      if (response && response.headers?.authorization) {
        const accessToken = response.headers['authorization'].replace('Bearer ', '');
        localStorage.setItem('access_token', accessToken);
        navigate('/main');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // 구독 목록 불러오는 부분
  // const { data: subscriptions } = useGetSubscriptionsQuery(userId as string, {
  //   skip: !userId, // userId가 없으면 API 호출을 하지 않음
  // });

  // useEffect(() => {
  //   if (subscriptions) {
  //     dispatch(setSubscriptions(subscriptions));
  //     console.log('Subscriptions stored in Redux:', subscriptions);
  //     navigate(`/main`);
  //   }
  // }, [subscriptions, dispatch, userId, navigate]);

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-dopameme-bg">
      <div className="flex h-full w-auto">
        <div className="flex min-h-80 min-w-[360px] flex-col items-center justify-center">
          <Link to="/main">
            <Logo />
          </Link>
          <div className="flex w-[346px] flex-col pt-8">
            <form onSubmit={handleSubmit}>
              <input
                className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                type="text"
                id="userId"
                placeholder="아이디"
                autoFocus
                autoComplete="off"
              ></input>
              <input
                className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="비밀번호"
                autoComplete="off"
              ></input>
              <div className="flex w-full justify-center">
                <Link to="/signup">
                  <button id="signupBut" className="px-10 text-white">
                    회원가입
                  </button>
                </Link>
                <button type="submit" disabled={isLoading} id="loginBut" className="px-10 text-white">
                  로그인
                </button>
              </div>
            </form>
            <div className="mt-5 flex h-5 w-full justify-center text-red-600">{isError && <div>{isError && '로그인 실패'}</div>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
