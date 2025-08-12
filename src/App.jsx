import React, { useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StakeholderPage from './pages/StakeholderPage';
import StakeholderListPage from './pages/StakeholderListPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';

const AppLayout = () => {
  const [isDesktopExpanded, setDesktopExpanded] = useState(true);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isListPage = location.pathname.startsWith('/stakeholders/');
  const isChatPage = location.pathname.startsWith('/chats');
  
  const mainPadding = isListPage || isChatPage ? '' : 'p-4 sm:p-6 lg:p-8';

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar
        isDesktopExpanded={isDesktopExpanded}
        setDesktopExpanded={setDesktopExpanded}
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setMobileOpen={setMobileOpen} />
        {/* The main content area now uses flexbox to allow the chat page to grow correctly */}
        <main className={`flex-1 overflow-y-auto flex flex-col ${mainPadding}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<StakeholderPage />} />
        <Route path="/stakeholders/:type" element={<StakeholderListPage />} />
        <Route path="/stakeholders/:type/:id" element={<ProfilePage />} />
        <Route path="/chats" element={<ChatPage />} />
        
        <Route path="/dashboard" element={<div className="text-2xl font-bold">Dashboard Page</div>} />
        <Route path="/screening" element={<div className="text-2xl font-bold">Screening Page</div>} />
        <Route path="/engagements" element={<div className="text-2xl font-bold">Engagements Page</div>} />
        <Route path="/tasks" element={<div className="text-2xl font-bold">Tasks Page</div>} />
        <Route path="/notifications" element={<div className="text-2xl font-bold">Notifications Page</div>} />
        <Route path="/settings" element={<div className="text-2xl font-bold">Settings Page</div>} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
