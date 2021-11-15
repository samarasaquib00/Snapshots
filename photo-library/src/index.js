import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import{ init } from 'emailjs-com';
init("user_KT30rvnEd5klfj0M1HNDT");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
