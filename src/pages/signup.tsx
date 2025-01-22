import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo_login.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../Redux/slice/authApi';

function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  type ApiError = {
    data: {
      statusCode: string | number;
      message: string;
    };
  };

  const isApiError = (err: unknown): err is ApiError => {
    return (
      typeof err === 'object' &&
      err !== null &&
      'data' in err &&
      typeof (err as ApiError).data === 'object' &&
      (typeof (err as ApiError).data.statusCode === 'string' || typeof (err as ApiError).data.statusCode === 'number') &&
      typeof (err as ApiError).data.message === 'string'
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('아이디를 입력해 주세요');
      return;
    } else if (!password) {
      setError('비밀번호를 입력해 주세요');
      return;
    } else if (!nickname) {
      setError('닉네임을 입력해 주세요');
      return;
    }
    try {
      setError('');
      const response = await register({ userId, password, nickname }).unwrap();
      console.log('회원가입 성공:', response.message);
      navigate(`/login`);
    } catch (err: unknown) {
      console.error('sign up failed:', err);
      if (isApiError(err) && err.data.statusCode == 409) {
        if (err.data.message == 'user_id already exists') {
          setError('이미 존재하는 아이디입니다.');
        } else {
          setError('이미 존재하는 닉네임입니다.');
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-dopameme-bg">
      <div className="flex h-full w-auto">
        <div className="flex min-h-80 flex-col items-center justify-center">
          <Link to="/main">
            <Logo />
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="flex w-[346px] flex-col pt-8">
              <input
                className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none"
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                id="userId"
                placeholder="아이디"
                autoFocus
                autoComplete="off"
              ></input>
              <input
                className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                id="password"
                placeholder="비밀번호"
                autoComplete="off"
              ></input>
              <input
                className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none"
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                id="nickname"
                placeholder="닉네임"
                autoComplete="off"
              ></input>
              <div className="flex w-full justify-center">
                <button type="submit" disabled={isLoading} className="px-10 text-white">
                  {isLoading ? '회원가입 중...' : '회원가입'}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5 flex h-5 w-full justify-center text-red-600">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
