import React, { useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StakeholderPage from "./pages/StakeholderPage";
import StakeholderListPage from "./pages/StakeholderListPage";
import ProfilePage from "./pages/ProfilePage"; // New Import
import LoginPage from "./pages/LoginPage";

// This component defines the main layout with the sidebar and header
const AppLayout = () => {
	const [isDesktopExpanded, setDesktopExpanded] = useState(true);
	const [isMobileOpen, setMobileOpen] = useState(false);
	const location = useLocation();

	// Check if the current page is a stakeholder list or profile page
	const isListPage = location.pathname.startsWith("/stakeholders/");

	// Conditionally apply padding based on the page
	const mainPadding = isListPage ? "" : "p-4 sm:p-6 lg:p-8";

	return (
		<div className="flex h-screen bg-gray-50 font-sans">
			<Sidebar isDesktopExpanded={isDesktopExpanded} setDesktopExpanded={setDesktopExpanded} isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />
			<div className="flex-1 flex flex-col overflow-hidden">
				<Header setMobileOpen={setMobileOpen} />
				<main className={`flex-1 overflow-y-auto ${mainPadding}`}>
					<Outlet /> {/* Child routes will render here */}
				</main>
			</div>
		</div>
	);
};

// This is the main App component that sets up all the routes
function App() {
	return (
		<Routes>
			{/* Routes that use the main AppLayout */}
			<Route element={<AppLayout />}>
				<Route path="/" element={<StakeholderPage />} />
				<Route path="/stakeholders/:type" element={<StakeholderListPage />} />
				<Route path="/stakeholders/:type/:id" element={<ProfilePage />} /> {/* New Profile Route */}
				{/* Placeholder routes for other navigation items */}
				<Route path="/dashboard" element={<div className="text-2xl font-bold">Dashboard Page</div>} />
				<Route path="/screening" element={<div className="text-2xl font-bold">Screening Page</div>} />
				<Route path="/engagements" element={<div className="text-2xl font-bold">Engagements Page</div>} />
				<Route path="/tasks" element={<div className="text-2xl font-bold">Tasks Page</div>} />
				<Route path="/notifications" element={<div className="text-2xl font-bold">Notifications Page</div>} />
				<Route path="/chats" element={<div className="text-2xl font-bold">Chats Page</div>} />
				<Route path="/settings" element={<div className="text-2xl font-bold">Settings Page</div>} />
			</Route>

			{/* Route that does not use the main layout */}
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default App;
