import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo_login.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../Redux/slice/authApi';
import { setAuth } from '../Redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useGetSubscriptionsQuery } from '../Redux/slice/subApi';
import { setSubscriptions } from '../Redux/slice/subSlice';

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ id, password }).unwrap();
      console.log('Login successful:', response);
      // Store the token or redirect to another page

      // 로그인 성공 시 Redux 상태에 토큰 저장
      if (response.token) {
        dispatch(setAuth({ token: response.token, nickname: response.nickname, id: response.id })); // Redux 상태에 토큰 저장
        console.log('Token stored in Redux:', response.token);
        setUserId(response.id);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const { data: subscriptions } = useGetSubscriptionsQuery(userId as string, {
    skip: !userId, // userId가 없으면 API 호출을 하지 않음
  });

  useEffect(() => {
    if (subscriptions) {
      dispatch(setSubscriptions(subscriptions));
      console.log('Subscriptions stored in Redux:', subscriptions);
      navigate(`/main`);
    }
  }, [subscriptions, dispatch, userId, navigate]);

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
                value={id}
                onChange={e => setId(e.target.value)}
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
            <div className="mt-5 flex h-5 w-full justify-center text-red-600">
              {isError && (
                <div>
                  {error && 'data' in error && typeof error.data === 'object' && error.data !== null && 'message' in error.data
                    ? (error.data as { message: string }).message
                    : error && 'message' in error
                      ? error.message
                      : 'An error occurred.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
