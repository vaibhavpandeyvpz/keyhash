import React from 'react';
import { render } from 'react-dom';
import MainPage from './pages/MainPage';
import { register } from './worker';
import './index.scss';

render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
  document.getElementById('root')
);

register();
