import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Shorts from './pages/shorts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="shorts" element={<Shorts />} />
    </Routes>
  );
}

export default App;
