import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <text>main</text>
      {/* <Link>는 <a>와 동일한 역할 */}
      <Link to="/shorts" className="text-red-500">
        쇼츠 보기
      </Link>
      <div className="flex size-80 bg-slate-400">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
