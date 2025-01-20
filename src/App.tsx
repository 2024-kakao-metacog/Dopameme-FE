import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Shorts from './pages/shorts';
import Login from './pages/login';
import Signup from './pages/signup';
import Notice from './pages/notice';
import Layout from './pages/layout';
import Channel from './pages/channel';
import ShortsManager from './pages/ShortsManager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/" element={<Layout />}>
        <Route path="main" element={<Main />} />
        <Route path="shorts" element={<ShortsManager />}>
          <Route path=":videoUrl" element={<Shorts />} />
        </Route>
        <Route path="notice" element={<Notice />} />
        <Route path=":id" element={<Channel />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
