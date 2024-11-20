import React from 'react';
import ReactDOM from 'react-dom/client';

import './global.css';
import AppWrapper from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
