import React from "react";
import { NavLink, Link } from "react-router-dom";
import PortfoliomateLogo from "../assets/PortfoliomateLogosidebar.svg";

// --- Icon Components ---
const LayoutDashboard = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect width="7" height="9" x="3" y="3" rx="1" />
		<rect width="7" height="5" x="14" y="3" rx="1" />
		<rect width="7" height="9" x="14" y="12" rx="1" />
		<rect width="7" height="5" x="3" y="16" rx="1" />
	</svg>
);
const Search = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</svg>
);
const Users = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
);
const Briefcase = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
		<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
	</svg>
);
const CheckSquare = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="m9 11 3 3L22 4" />
		<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
	</svg>
);
const Bell = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
		<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
	</svg>
);
const MessageSquare = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
);
const SettingsIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73 2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);
const LogOut = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		<polyline points="16 17 21 12 16 7" />
		<line x1="21" x2="9" y1="12" y2="12" />
	</svg>
);
const Megaphone = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="m3 11 18-5v12L3 14v-3z" />
		<path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
	</svg>
);

// Toggle icons
const ChevronLeft = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
		<path d="m15 18-6-6 6-6" />
	</svg>
);
const ChevronRight = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
		<path d="m9 18 6-6-6-6" />
	</svg>
);

const NavItem = ({ to, icon, children, isExpanded }) => {
	const baseClasses = `flex items-center h-10 px-4 my-1 rounded-md transition-colors duration-200 text-sm font-medium ${!isExpanded ? "justify-center" : ""}`;
	const activeClasses = "bg-[#312E81] text-white";
	const inactiveClasses = "text-gray-500 hover:bg-gray-100";

	return (
		<NavLink to={to} end className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
			{icon}
			<span className={`overflow-hidden transition-all whitespace-nowrap ${isExpanded ? "w-40 ml-3" : "w-0"}`}>{children}</span>
		</NavLink>
	);
};

function Sidebar({ isDesktopExpanded, setDesktopExpanded, isMobileOpen, setMobileOpen }) {
	const sidebarContent = (
		<div className="flex flex-col h-full">
			<div className="p-4 flex items-center h-16">
				<div className={`flex items-center justify-center transition-all ${isDesktopExpanded ? "w-auto" : "w-full"}`}>
					<img src={PortfoliomateLogo} alt="Portfoliomate Logo" className="h-12 w-12 flex-shrink-0" />
					<span className={`font-bold text-xl whitespace-nowrap overflow-hidden transition-all text-gray-800 ${isDesktopExpanded ? "w-auto ml-3" : "w-0"}`}>Portfoliomate</span>
				</div>
			</div>

			<nav className="flex-1 px-2 py-4 space-y-1">
				<NavItem to="/dashboard" icon={<LayoutDashboard />} isExpanded={isDesktopExpanded}>
					Dashboard
				</NavItem>
				<NavItem to="/screening" icon={<Search />} isExpanded={isDesktopExpanded}>
					Screening
				</NavItem>
				<NavItem to="/stakeholders" icon={<Users />} isExpanded={isDesktopExpanded}>
					Stakeholders
				</NavItem>
				<NavItem to="/engagements" icon={<Briefcase />} isExpanded={isDesktopExpanded}>
					Engagements
				</NavItem>
				<NavItem to="/tasks" icon={<CheckSquare />} isExpanded={isDesktopExpanded}>
					Task Manager
				</NavItem>
				<NavItem to="/notifications" icon={<Bell />} isExpanded={isDesktopExpanded}>
					Notifications
				</NavItem>
				<NavItem to="/announcements" icon={<Megaphone />} isExpanded={isDesktopExpanded}>
					Announcements
				</NavItem>
				<NavItem to="/chats" icon={<MessageSquare />} isExpanded={isDesktopExpanded}>
					Chats
				</NavItem>
				<NavItem to="/settings" icon={<SettingsIcon />} isExpanded={isDesktopExpanded}>
					Settings
				</NavItem>
			</nav>

			<div className="p-2 border-t border-gray-200">
				<Link to="/login" className={`flex items-center h-10 px-4 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200 text-sm font-medium ${!isDesktopExpanded ? "justify-center" : ""}`}>
					<LogOut />
					<span className={`overflow-hidden transition-all whitespace-nowrap ${isDesktopExpanded ? "w-40 ml-3" : "w-0"}`}>Logout</span>
				</Link>
			</div>
		</div>
	);

	return (
		<>
			{/* Mobile sidebar */}
			<div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white text-gray-800 transform ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`} onClick={() => setMobileOpen(false)}>
				{sidebarContent}
			</div>
			{isMobileOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setMobileOpen(false)}></div>}

			{/* Desktop sidebar */}
			<aside className={`hidden md:flex flex-col bg-white h-full border-r border-gray-200 transition-all duration-300 ease-in-out z-20 relative ${isDesktopExpanded ? "w-64" : "w-20"}`}>
				{/* Vertical handle toggle */}
				<button onClick={() => setDesktopExpanded(!isDesktopExpanded)} className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -right-3 z-30 w-7 h-14 bg-white border border-gray-200 rounded-full shadow hover:bg-gray-50 transition" aria-label={isDesktopExpanded ? "Collapse sidebar" : "Expand sidebar"}>
					{isDesktopExpanded ? <ChevronLeft /> : <ChevronRight />}
				</button>

				{sidebarContent}
			</aside>
		</>
	);
}

export default Sidebar;
