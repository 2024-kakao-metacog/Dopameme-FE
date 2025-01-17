import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Shorts from './pages/shorts';
import Login from './pages/login';
import Signup from './pages/signup';
import Notice from './pages/notice';
import Layout from './pages/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="main" element={<Main />} />
        <Route path="shorts" element={<Shorts />} />
        <Route path="notice" element={<Notice />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
