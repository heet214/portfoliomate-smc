import React, { useState, useMemo } from "react";
import NotificationItem from "../components/NotificationItem";

// Mock data for notifications - later this will come from Firebase
const notificationsData = [
	{
		id: 1,
		type: "new_announcement",
		icon: "Megaphone",
		title: "New Announcement Published",
		description: 'The "Welcome to the SMC Event Platform!" announcement has been posted.',
		timestamp: "2 hours ago",
		isRead: false,
		action: { type: "link", path: "/announcements" },
	},
	{
		id: 2,
		type: "new_message",
		icon: "MessageSquare",
		title: "New Message from Priya Patel",
		description: '"Hi Aarav, looking forward to connecting. I was impressed by your work at InnovateTech."',
		timestamp: "5 hours ago",
		isRead: false,
		action: { type: "link", path: "/chat/priya-patel" },
	},
	{
		id: 3,
		type: "connection_request",
		icon: "UserPlus",
		title: "Connection Request from Rohan Mehta",
		description: "Rohan Mehta from Capital Ventures wants to connect with you.",
		timestamp: "1 day ago",
		isRead: true,
		action: { type: "buttons", options: ["Accept", "Decline"] },
	},
	{
		id: 4,
		type: "profile_view",
		icon: "Eye",
		title: "Your profile was viewed",
		description: "Your profile was viewed by 5 people yesterday. Keep your profile updated!",
		timestamp: "2 days ago",
		isRead: true,
		action: { type: "link", path: "/profile/me" },
	},
];

const NotificationsPage = () => {
	const [activeFilter, setActiveFilter] = useState("All");

	const filteredNotifications = useMemo(() => {
		if (activeFilter === "Unread") {
			return notificationsData.filter(n => !n.isRead);
		}
		return notificationsData;
	}, [activeFilter]);

	return (
		<div className="w-full max-w-7xl">
			{/* Page header */}
			<div className="mb-8">
				<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Notifications</h1>
				<p className="text-gray-500 mt-1">Your recent activity and updates from the event.</p>
			</div>

			<div className="bg-white rounded-xl shadow-md">
				{/* Filters */}
				<div className="p-4 border-b border-gray-200">
					<div className="flex items-center space-x-4">
						<button onClick={() => setActiveFilter("All")} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeFilter === "All" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
							All
						</button>
						<button onClick={() => setActiveFilter("Unread")} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeFilter === "Unread" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
							Unread
						</button>
					</div>
				</div>

				{/* Notifications List */}
				<div className="divide-y divide-gray-200">
					{filteredNotifications.length > 0 ? (
						filteredNotifications.map(notification => <NotificationItem key={notification.id} notification={notification} />)
					) : (
						<div className="text-center p-10">
							<p className="text-gray-500">You have no new notifications.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationsPage;
