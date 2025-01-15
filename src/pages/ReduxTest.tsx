import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../Redux/store';
import VideoList from '../components/VideoList';

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold p-4">Video List</h1>
      <VideoList />
    </div>
  );
}

export default App;
