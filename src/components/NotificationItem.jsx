import React from "react";
import { useNavigate } from "react-router-dom";

// SVG Icon Components (inlined)
const MegaphoneIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M12 6L8 10H6a2 2 0 00-2 2v4a2 2 0 002 2h2l4 4V6z" />
		<path d="M16.5 12a4.5 4.5 0 00-4.5-4.5v9a4.5 4.5 0 004.5-4.5z" />
	</svg>
);
const MessageSquareIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
	</svg>
);
const UserPlusIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
		<circle cx="8.5" cy="7" r="4" />
		<line x1="20" y1="8" x2="20" y2="14" />
		<line x1="17" y1="11" x2="23" y2="11" />
	</svg>
);
const EyeIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);

const iconMap = {
	Megaphone: MegaphoneIcon,
	MessageSquare: MessageSquareIcon,
	UserPlus: UserPlusIcon,
	Eye: EyeIcon,
};

const NotificationItem = ({ notification }) => {
	const navigate = useNavigate();
	const { type, icon, title, description, timestamp, isRead, action } = notification;
	const IconComponent = iconMap[icon] || MegaphoneIcon;

	const handleActionClick = (e, path) => {
		e.stopPropagation(); // Prevent triggering the main item click
		if (path) {
			navigate(path);
		}
		// Add logic for button actions here (e.g., accept/decline)
		console.log(`Action clicked for notification ID: ${notification.id}`);
	};

	const handleItemClick = () => {
		if (action.type === "link") {
			navigate(action.path);
		}
	};

	return (
		<div className={`p-4 flex items-start gap-4 transition-colors hover:bg-gray-50 ${action.type === "link" ? "cursor-pointer" : ""}`} onClick={handleItemClick}>
			{!isRead && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>}
			<div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isRead ? "ml-5" : ""} bg-gray-100`}>
				<IconComponent className="w-5 h-5 text-gray-500" />
			</div>
			<div className="flex-grow">
				<p className="font-semibold text-gray-800">{title}</p>
				<p className="text-sm text-gray-500">{description}</p>
				<p className="text-xs text-gray-400 mt-1">{timestamp}</p>
				{action.type === "buttons" && (
					<div className="mt-3 flex items-center gap-3">
						<button onClick={e => handleActionClick(e)} className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
							{action.options[0]}
						</button>
						<button onClick={e => handleActionClick(e)} className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
							{action.options[1]}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default NotificationItem;
