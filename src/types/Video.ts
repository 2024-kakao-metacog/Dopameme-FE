//비디오 정보 타입
export interface Video {
  title: string; // 비디오 제목
  videoUrl: string; // 비디오 URL
  thumbnailUrl: string; // 썸네일 이미지 URL
  publishedAt: string; // 게시 날짜 (ISO 8601 문자열 형식)
  userId: string; // 업로더 사용자 ID
  userNickname: string; // 업로더 사용자 닉네임
  isOwner: boolean; // 현재 사용자가 해당 비디오의 소유자인지 여부
  isSubscribed: boolean; // 업로더를 구독 중인지 여부
  canSubscribe: boolean; // 업로더를 구독할 수 있는지 여부
}
