import React from 'react'
// import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'

const container: any = document.getElementById('root');
const root = createRoot(container);
root.render(
  // 通过在应用入口添加 BrowserRouter 组件开启 React Router 功能
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
