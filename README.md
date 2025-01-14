## Docker

- 도커 이미지 빌드
  `docker build -t dopameme-image .`

- 컨테이너 실행
  `docker run -v ${PWD}/src:/app/src:ro -d -p 3001:3000 --name dopameme-web dopameme-image` - -v ${PWD}/src:/app/src : 원활한 코드 수정을 위한 Bind Mount - :ro : readonly(컨테이너가) - -p 3001:3000 : 포트포워딩 - --name dopameme-web dopameme-image : 이름이 dopameme-image인 이미지로 dopameme-web 컨테이너 생성
