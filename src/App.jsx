import React, { useState } from "react";
import { Navigate, Routes, Route, Outlet, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StakeholderPage from "./pages/StakeholderPage";
import StakeholderListPage from "./pages/StakeholderListPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import NotificationsPage from "./pages/NotificationsPage";
import RegisterPage from "./pages/RegisterationPage";
import SettingsPage from "./pages/SettingsPage";

const AppLayout = () => {
	const [isDesktopExpanded, setDesktopExpanded] = useState(true);
	const [isMobileOpen, setMobileOpen] = useState(false);
	const location = useLocation();

	// Check the current route to apply styles conditionally
	const isListPage = location.pathname.startsWith('/stakeholders/');
	const isChatPage = location.pathname.startsWith('/chats');
	const isProfilePage = location.pathname.includes('/stakeholders/') && location.pathname.split('/').length === 4;

	// Remove padding for full-width pages like list, chat, and profile
	const mainPadding = isListPage || isChatPage || isProfilePage ? '' : 'p-4 sm:p-6 lg:p-8';
	const mainBg = isProfilePage ? 'bg-white' : 'bg-gray-50';

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
				<main className={`flex-1 overflow-y-auto flex flex-col ${mainPadding} ${mainBg}`}>
					<Outlet /> {/* Child routes will render here */}
				</main>
			</div>
		</div>
	);
};

function App() {
	return (
		<Routes>
			{/* Routes using AppLayout */}
			<Route element={<AppLayout />}>
				<Route path="/" element={<Navigate to="/stakeholders" replace />} />
				<Route path="/stakeholders" element={<StakeholderPage />} />
				<Route path="/stakeholders/:type" element={<StakeholderListPage />} />
				<Route path="/stakeholders/:type/:id" element={<ProfilePage />} />
				<Route path="/chats" element={<ChatPage />} />
				<Route path="/announcements" element={<AnnouncementsPage />} />
				<Route path="/notifications" element={<NotificationsPage />} />
				<Route path="/settings/*" element={<SettingsPage />} />

				{/* Placeholder routes */}
				<Route path="/dashboard" element={<div className="text-2xl font-bold">Dashboard Page</div>} />
				<Route path="/screening" element={<div className="text-2xl font-bold">Screening Page</div>} />
				<Route path="/engagements" element={<div className="text-2xl font-bold">Engagements Page</div>} />
				<Route path="/tasks" element={<div className="text-2xl font-bold">Tasks Page</div>} />
				<Route path="/notifications" element={<div className="text-2xl font-bold">Notifications Page</div>} />

			</Route>

			{/* Standalone route */}
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
}

export default App;
