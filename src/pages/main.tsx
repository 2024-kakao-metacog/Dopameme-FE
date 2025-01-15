import React, { useEffect } from 'react';
import VideoBotton from '../components/VideoBotton';
import { Link, Outlet } from 'react-router-dom';
import { useGetVideosQuery } from '../Redux/videoApi'; // RTK Query 훅 임포트
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { addVideos } from '../Redux/videoSlice'; // 액션 가져오기

function App() {
  const dispatch = useDispatch();

  // API에서 데이터를 가져오고, 로컬 state에 저장
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // Redux Store에 데이터를 저장
  useEffect(() => {
    if (videos) {
      dispatch(addVideos(videos));
    }
  }, [videos, dispatch]);

  // Redux Store에서 데이터 읽기
  const storedVideos = useSelector((state: RootState) => state.videos.videos);

  if (isLoading) return <p>Loading videos...</p>;
  if (isError) return <p>Error loading videos!</p>;

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-row w-full h-full">
        {/* <Link>는 <a>와 동일한 역할 */}
        <div className="flex flex-col inset-y-0 left-0 w-1/5">
          <Link to="/" className="h-1/3 bg-dopameme-bg">
            <span className="text-kakao-yellow">main</span>
          </Link>
          <Link to="/ReduxTest" className="h-1/3 bg-dopameme-bg">
            <span className="text-kakao-yellow">reduxtest</span>
          </Link>
          <div className="h-1 bg-white"></div>
          <span className="w-full h-full bg-dopameme-bg text-kakao-yellow">메뉴바</span>
        </div>
        <div className="flex w-1 bg-white"></div>
        <div className="flex p-[0.625rem] justify-center items-center space-x-[0.625rem] h-full w-full bg-dopameme-bg">
          {storedVideos.map(video => (
            <Link key={video.videoId} to="/shorts" className="rounded-lg overflow-hidden">
              <VideoBotton src={video.videoUrl} />
              <span className="flex text-white">{video.title}</span>
            </Link>
          ))}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
