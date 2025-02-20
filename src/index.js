import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './RTK/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <ApiProvider api={apiSlice}>
    <App  />
    </ApiProvider>
 
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
