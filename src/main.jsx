import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const StyleInjector = () => {
  React.useEffect(() => {
      document.body.className = 'bg-gray-50 font-sans antialiased';
  }, []);
  return null;
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <StyleInjector />
    <App />
    </BrowserRouter>
  </React.StrictMode>
);