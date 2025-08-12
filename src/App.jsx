import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StakeholderPage from './pages/StakeholderPage';
import LoginPage from './pages/LoginPage';

const AppLayout = () => {
  const [isDesktopExpanded, setDesktopExpanded] = useState(true);
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    // Set the main background to the light gray from the design
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar
        isDesktopExpanded={isDesktopExpanded}
        setDesktopExpanded={setDesktopExpanded}
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
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
        {/* Add other routes here */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;