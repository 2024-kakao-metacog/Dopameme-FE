import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store/store';
import { useGetVideosQuery } from '../Redux/slice/videoApi'; // RTK Query 훅
import { addVideos } from '../Redux/slice/videoSlice'; // Redux 액션
import VideoCard from '../components/VideoCard'; // VideoCard 컴포넌트

function App() {
  const dispatch = useDispatch();

  // RTK Query로 데이터 가져오기
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // Redux에 데이터 저장
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
    <div className="flex size-full items-center justify-center bg-dopameme-bg">
      <div className="flex size-full min-w-[1024px] flex-row p-4">
        {/* VideoCard 컴포넌트를 동적으로 렌더링 */}
        {storedVideos.slice(0, 4).map((video, index) => (
          <VideoCard key={video?.videoId || `placeholder-${index}`} video={video} />
        ))}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
