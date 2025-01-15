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
      <div className="flex size-full flex-row">
        {/* <Link>는 <a>와 동일한 역할 */}
        <div className="flex size-full items-center justify-center space-x-2.5 bg-dopameme-bg p-2.5">
          {[...storedVideos, ...Array(4 - storedVideos.length).fill(null)].map((video, index) => (
            <Link key={video?.videoId || `placeholder-${index}`} to={video ? '/shorts' : '#'}>
              <div className="relative aspect-[9/16] w-[min(30vw,36rem)] max-w-full overflow-hidden rounded-lg">
                {video ? (
                  <VideoBotton videoUrl={video.videoUrl} thumbnailUrl={video.thumbnailUrl} />
                ) : (
                  // Placeholder 썸네일 또는 빈 상태 표시
                  <div className="flex size-full items-center justify-center bg-gray-800">
                    <span className="text-white">No Video</span>
                  </div>
                )}
              </div>
              <span className="flex text-white">{video?.title || 'Empty Slot'}</span>
            </Link>
          ))}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
