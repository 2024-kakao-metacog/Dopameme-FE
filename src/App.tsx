import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Shorts from './pages/shorts';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="shorts" element={<Shorts />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
