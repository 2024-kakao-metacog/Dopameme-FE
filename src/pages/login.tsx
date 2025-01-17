import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo_login.svg';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../Redux/slice/authApi';
import { setToken } from '../Redux/slice/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      console.log('Login successful:', response);
      // Store the token or redirect to another page

      // 로그인 성공 시 Redux 상태에 토큰 저장
      if (response.token) {
        dispatch(setToken(response.token)); // Redux 상태에 토큰 저장
        console.log('Token stored in Redux:', response.token);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

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
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                id="userId"
                placeholder="아이디"
                autoFocus
              ></input>
              <input
                className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="비밀번호"
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
