import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AudioProvider } from './context/AudioContext';
import { PhotoProvider } from './context/PhotoContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioProvider>
      <PhotoProvider>
        <App />
      </PhotoProvider>
    </AudioProvider>
  </React.StrictMode>
);
