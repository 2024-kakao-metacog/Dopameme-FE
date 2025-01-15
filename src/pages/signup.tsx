import React from 'react';
import { ReactComponent as Logo } from '../assets/logo_login.svg';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-dopameme-bg ">
      <div className="flex h-full w-auto">
        <div className="flex min-h-80 flex-col items-center justify-center">
          <Logo />
          <div className="flex w-[346px] flex-col pt-8">
            <input className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none" type="text" id="userId" placeholder="아이디" autoFocus></input>
            <input className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none" type="password" id="password" placeholder="비밀번호"></input>
            <input className="mb-7 w-full border-b-2 border-white bg-dopameme-bg px-2 py-1 text-white focus:outline-none" type="text" id="nickname" placeholder="닉네임"></input>
            <div className="flex w-full justify-center">
              <button id="signup" className="px-10 text-white">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
