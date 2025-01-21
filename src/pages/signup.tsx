import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo_login.svg';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from '../Redux/slice/authApi';

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [register, { isLoading, isError }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register({ id, password, nickname }).unwrap();
      console.log('회원가입 성공:', response.message);
    } catch (err: unknown) {
      console.error('Login failed:', err);
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
                value={id}
                onChange={e => setId(e.target.value)}
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
          <div className="mt-5 flex h-5 w-full justify-center text-red-600">{isError && <p className="text-red-500">회원가입 실패</p>}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
