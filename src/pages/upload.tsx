import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      generateThumbnail(selectedFile); // 파일을 선택하면 썸네일을 생성
    }
  };

  const handleClick = () => {
    fileRef?.current?.click();
  };

  const generateThumbnail = (file: File) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (video && canvas && ctx) {
      // 비디오 파일 URL을 생성
      const videoUrl = URL.createObjectURL(file);
      video.src = videoUrl;

      // 비디오가 로드되면 첫 번째 프레임을 캡처
      video.onloadeddata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 0; // 첫 번째 프레임으로 설정
      };

      // 첫 번째 프레임을 캔버스에 그린 후 썸네일 생성
      video.onseeked = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // 동영상 첫 번째 프레임을 캔버스에 그리기
        // 캔버스에 그려진 이미지를 base64로 변환하여 상태에 저장
        const thumbData = canvas.toDataURL('image/png');
        setThumbnail(thumbData);
      };
    }
  };

  useEffect(() => {
    // 선택된 파일이 있으면 썸네일을 업데이트
    if (file) {
      generateThumbnail(file);
    }
  }, [file]);

  const handleUpload = async () => {
    if (!file || !title) {
      console.error('파일과 제목을 모두 입력해야 합니다.');
      setError('파일과 제목을 모두 입력해야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // 파일 추가
    formData.append('title', title); // 제목 추가

    try {
      const response = await axios.post('YOUR_SERVER_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('서버 응답:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || '업로드 실패: 서버에서 에러가 발생했습니다.');
      } else {
        setError('업로드 실패: 네트워크 에러가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex size-full flex-col">
      {/* header */}
      <div className="flex h-32 min-h-32 w-full items-center border-b-2 border-white">
        <div className="h-auto w-full pl-11 text-2xl font-bold text-white">동영상 업로드</div>
      </div>
      {/* contents */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex size-full max-h-[750px] max-w-[850px] items-center justify-center rounded-lg bg-menubar-highlight px-4">
          {/* 동영상 선택 */}
          <div className="h-[352px] w-[198px] rounded-md border-2 border-[#BDBDBD]">
            <label htmlFor="file"></label>
            <div onClick={handleClick} className="flex size-full items-center justify-center text-6xl text-white">
              {thumbnail ? <img src={thumbnail} className="size-full" /> : '+'}
            </div>
            <input ref={fileRef} name="file" type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          </div>
          {/* 제목 / 업로드 버튼 */}
          <div className="ml-5 flex h-[352px] w-auto flex-col justify-center pt-20">
            <div className="flex h-24 w-[356px] flex-col rounded-md border-2 border-[#BDBDBD] px-2 py-1">
              <div className="flex h-auto w-full">
                <text className="font-normal text-[#BDBDBD]">제목 (필수항목)</text>
              </div>
              <hr className="mt-1" />
              <textarea
                spellCheck={false}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력해 주세요"
                className="mt-2 size-full flex-1 resize-none overflow-hidden bg-menubar-highlight text-white focus:outline-none"
              ></textarea>
            </div>
            <div className="mt-5 flex h-9 w-full justify-center">
              <button onClick={handleUpload} className="border-b-2 border-menubar-highlight px-3 font-bold text-white hover:border-white">
                업로드
              </button>
            </div>
            <div className="mt-2 flex h-9 w-full justify-center text-red-600">{error}</div>
          </div>
        </div>
      </div>
      {/* 숨겨진 비디오 태그 */}
      <video ref={videoRef} style={{ display: 'none' }} />
      {/* 숨겨진 캔버스 태그 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;
