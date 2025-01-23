import React from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '../Redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../Redux/slice/authSlice';

function App() {
  const { id } = useParams<{ id: string }>();
  const { id: myId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    alert('로그아웃되었습니다.');
  };

  return (
    <div className="flex size-full flex-col">
      {/* header */}
      <div className="flex h-32 min-h-32 w-full items-center border-b-2 border-white">
        <div className="flex h-full items-center pl-14 pr-3 text-4xl font-bold text-white">{id}</div>
        {id === myId && (
          <div className="flex h-full items-center">
            <button className="border-b-2 border-dopameme-bg text-white hover:border-white" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
      {/* contents */}
      <div className="flex-1 p-6">
        <div className="flex size-full flex-col px-4">
          {/* notice container */}
          <div className="w-full text-white">test</div>
        </div>
      </div>
    </div>
  );
}

export default App;
