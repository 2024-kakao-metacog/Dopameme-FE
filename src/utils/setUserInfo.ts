import { AppDispatch } from '../Redux/store/store';
import axios from 'axios';
import { clearAuth, setAuth } from '../Redux/slice/authSlice';
import API_URL from '../config/env';
import { jwtDecode } from 'jwt-decode';

export const getInfoByToken = () => async (dispatch: AppDispatch) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    try {
      // 디코딩을 통해 user ID 추출
      const decodedToken = jwtDecode<{ userId: string }>(accessToken);
      const userId = decodedToken.userId;

      // API 호출을 통해 닉네임 정보 가져오기
      const response = await axios.get(`${API_URL}v1/user`, {
        params: { userId: userId },
      });
      console.log(response);
      const nickname = response.data.snippet.nickname || 'user';

      // 액션 디스패치
      dispatch(
        setAuth({
          accessToken,
          nickname,
          id: userId,
        }),
      );
    } catch (error) {
      console.error('Error fetching user info:', error);
      alert('로그인 오류, 다시 로그인 해주세요');
      dispatch(clearAuth());
    }
  }
};
