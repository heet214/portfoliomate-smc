import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

const StyleInjector = () => {
  React.useEffect(() => {
    document.body.className = 'bg-gray-50 font-sans antialiased';
  }, []);
  return null;
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <StyleInjector />
      <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);