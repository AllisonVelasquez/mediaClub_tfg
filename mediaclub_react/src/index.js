import React from 'react';
import  { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import UserList from './components/UserList';
import Popular from './components/Popular';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <UserList/>
    <Popular/>
  </React.StrictMode>
);
