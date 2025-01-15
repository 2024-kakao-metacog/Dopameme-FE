import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Shorts from './pages/shorts';
import ReduxTest from './pages/ReduxTest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="ReduxTest" element={<ReduxTest />} />
      <Route path="shorts" element={<Shorts />} />
    </Routes>
  );
}

export default App;
