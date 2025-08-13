import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext"; // Assuming you have this context
// import { toast } from "react-toastify"; // Assuming you use react-toastify
// import logoImage from "../assets/vector.png"; // Assuming you have a logo

// --- SVG Icon Components ---
const SquaresFourIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect x="3" y="3" width="7" height="7"></rect>
		<rect x="14" y="3" width="7" height="7"></rect>
		<rect x="14" y="14" width="7" height="7"></rect>
		<rect x="3" y="14" width="7" height="7"></rect>
	</svg>
);
const UsersIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
		<circle cx="9" cy="7" r="4"></circle>
		<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
		<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
	</svg>
);
const HandshakeIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M14.5 10.5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1.14a2 2 0 0 1 1.79 1.14l1.28 2.56a2 2 0 0 1 .52 1.3L20 16.5a2 2 0 0 1-2 2h-1.58a2 2 0 0 1-1.79-1.14l-1.28-2.56a2 2 0 0 1-.52-1.3z" />
		<path d="M9.5 13.5a2 2 0 0 0 2 2V17a2 2 0 0 0-2 2H8.36a2 2 0 0 0-1.79 1.14l-1.28 2.56a2 2 0 0 0 .52 1.3L7 21.5a2 2 0 0 0 2 2h1.58a2 2 0 0 0 1.79-1.14l1.28-2.56a2 2 0 0 0-.52-1.3z" />
	</svg>
);
const BellIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
		<path d="M13.73 21a2 2 0 0 1-3.46 0" />
	</svg>
);
const ChatIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
);
const TaskIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
		<path d="M14 2v4a2 2 0 0 0 2 2h4" />
		<path d="m9 14 2 2 4-4" />
	</svg>
);
const MegaphoneIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="m3 11 18-5v12L3 14v-3z" />
		<path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
	</svg>
);
const SettingsIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);
const LogoutIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		<polyline points="16 17 21 12 16 7" />
		<line x1="21" y1="12" x2="9" y2="12" />
	</svg>
);

const Sidebar = () => {
	const navigate = useNavigate();
	// const { logOut, user } = UserAuth(); // Assuming user object is available from context

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/login");
		} catch (err) {
			console.error(err.message);
			toast.error("Failed to log out.");
		}
	};

	const menuItems = [
		{ path: "/dashboard", label: "Dashboard", icon: SquaresFourIcon },
		{ path: "/stakeholders", label: "Stakeholders", icon: UsersIcon },
		{ path: "/engagements", label: "Engagements", icon: HandshakeIcon },
		{ path: "/announcements", label: "Announcements", icon: MegaphoneIcon },
		{ path: "/notifications", label: "Notifications", icon: BellIcon, badge: true },
		{ path: "/chat", label: "Chat", icon: ChatIcon },
		{ path: "/tasks", label: "Task Manager", icon: TaskIcon },
	];

	return (
		<div className="bg-white h-screen w-64 fixed left-0 top-0 flex flex-col border-r border-gray-200 z-[100]">
			{/* Header */}
			<div className="h-20 w-full border-b border-gray-200 flex items-center px-6">
				{/* <img src={logoImage} alt="Logo" className="h-8 w-auto mr-3" /> */}
				<h2 className="text-xl font-bold text-gray-800">Portfoliomate</h2>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col justify-between py-6">
				{/* Navigation Menu */}
				<div className="px-4">
					<ul className="space-y-2">
						{menuItems.map(({ path, label, icon: Icon, badge }) => (
							<li key={path}>
								<NavLink to={path} className={({ isActive }) => `flex items-center px-4 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 text-sm font-medium ${isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
									<Icon className="w-5 h-5 mr-3 flex-shrink-0" />
									<span className="whitespace-nowrap">{label}</span>
									{/* You can add a badge component here if needed */}
								</NavLink>
							</li>
						))}
					</ul>
				</div>

				{/* Bottom Section */}
				<div className="px-4">
					<ul className="space-y-2">
						<li>
							<NavLink to="/settings" className={({ isActive }) => `flex items-center px-4 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 text-sm font-medium ${isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
								<SettingsIcon className="w-5 h-5 mr-3 flex-shrink-0" />
								<span className="whitespace-nowrap">Settings</span>
							</NavLink>
						</li>
						<li>
							<button onClick={handleLogout} className="w-full flex items-center px-4 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 text-sm font-medium text-red-600 hover:bg-red-50">
								<LogoutIcon className="w-5 h-5 mr-3 flex-shrink-0" />
								<span className="whitespace-nowrap">Logout</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
