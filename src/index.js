import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { PlaylistListProvider } from './contexts/PlaylistListContext';
import { PlaylistProvider } from './contexts/PlaylistContext';


ReactDOM.render(
  <BrowserRouter>
    <PlaylistListProvider>
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </PlaylistListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);