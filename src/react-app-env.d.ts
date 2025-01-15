/// <reference types="react-scripts" />
// 변수 타입 지정하는 파일
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_KEY: string;
  }
}
