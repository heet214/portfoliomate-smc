import React, { useState, useMemo } from "react";
import AnnouncementCard from "../components/AnnouncementCard";

// SVG Icon Components (inlined)
const PlusIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="12" y1="5" x2="12" y2="19"></line>
		<line x1="5" y1="12" x2="19" y2="12"></line>
	</svg>
);
const ImageIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
		<circle cx="8.5" cy="8.5" r="1.5"></circle>
		<polyline points="21 15 16 10 5 21"></polyline>
	</svg>
);
const VideoIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M22 8l-6 4 6 4V8z"></path>
		<rect x="2" y="6" width="14" height="12" rx="2" ry="2"></rect>
	</svg>
);
const MicIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
		<path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
		<line x1="12" y1="19" x2="12" y2="23"></line>
	</svg>
);
const SearchIcon = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="11" cy="11" r="8"></circle>
		<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
	</svg>
);

// Mock data for announcements - later this will come from Firebase
const announcementsData = [
	{
		id: 1,
		author: "SMC Admin",
		role: "Event Coordinator",
		avatar: "https://placehold.co/40x40/3B82F6/FFFFFF?text=A",
		timestamp: "2 hours ago",
		category: "Event Update",
		categoryColor: "blue",
		title: "Welcome to the SMC Event Platform!",
		content: "We are thrilled to have you join us. This platform is designed to help you connect with other stakeholders, stay updated on event schedules, and make the most of your time here. Please complete your profile to enhance your networking experience.",
		imageUrl: "https://placehold.co/600x300/DBEAFE/1E40AF?text=Welcome+Image",
		isPinned: true,
	},
	{
		id: 2,
		author: "SMC Admin",
		role: "Platform Admin",
		avatar: "https://placehold.co/40x40/3B82F6/FFFFFF?text=A",
		timestamp: "1 day ago",
		category: "Important",
		categoryColor: "red",
		title: "Keynote Speaker Announcement: Dr. Evelyn Reed",
		content: "We are honored to announce that Dr. Evelyn Reed, a pioneer in sustainable technology, will be delivering the opening keynote. Her session will cover the future of green innovation and its impact on global markets. Don't miss it!",
		imageUrl: null,
		isPinned: false,
	},
	{
		id: 3,
		author: "Event Operations",
		role: "Operations Team",
		avatar: "https://placehold.co/40x40/F59E0B/FFFFFF?text=O",
		timestamp: "3 days ago",
		category: "Logistics",
		categoryColor: "yellow",
		title: "Networking Dinner Schedule",
		content: "The official networking dinner will be held on the first day of the event at 7:00 PM in the Grand Ballroom. Please RSVP through the link sent to your email to confirm your attendance.",
		imageUrl: "https://placehold.co/600x300/FEF3C7/B45309?text=Dinner+Details",
		isPinned: false,
	},
	{
		id: 4,
		author: "SMC Admin",
		role: "Platform Admin",
		avatar: "https://placehold.co/40x40/3B82F6/FFFFFF?text=A",
		timestamp: "4 days ago",
		category: "Workshop",
		categoryColor: "green",
		title: 'New Workshop Added: "AI for Social Good"',
		content: "Join us for an interactive workshop on how AI can be leveraged to solve some of the world's most pressing challenges. Limited spots available, sign up now!",
		imageUrl: null,
		isPinned: false,
	},
];

const AnnouncementsPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState("All");

	// Get unique categories for filter buttons
	const categories = ["All", ...new Set(announcementsData.map(item => item.category))];

	// Memoized filtered announcements
	const filteredAnnouncements = useMemo(() => {
		return announcementsData
			.filter(announcement => {
				const matchesCategory = activeFilter === "All" || announcement.category === activeFilter;
				const matchesSearch = searchTerm === "" || announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
				return matchesCategory && matchesSearch;
			})
			.sort((a, b) => {
				// Pinned posts first, then sort by ID (newest first)
				if (a.isPinned && !b.isPinned) return -1;
				if (!a.isPinned && b.isPinned) return 1;
				return b.id - a.id;
			});
	}, [searchTerm, activeFilter]);

	return (
		<div className="w-full max-w-7xl mx-auto">
			{/* Page header */}
			<div className="mb-8">
				<h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Announcements</h1>
				<p className="text-gray-500 mt-1">Latest news, events, and important information.</p>
			</div>

			<div className="grid grid-cols-12 gap-6">
				{/* Main Content: Feed */}
				<div className="col-span-12 lg:col-span-8">
					{/* Create Post component */}
					<div className="bg-white p-4 rounded-xl shadow-md mb-6">
						<div className="flex items-start space-x-4">
							<img src="https://placehold.co/40x40/3B82F6/FFFFFF?text=A" alt="admin avatar" className="w-10 h-10 rounded-full" />
							<textarea className="w-full p-2 border-none focus:ring-0 resize-none placeholder-gray-500" rows="2" placeholder="Create a new announcement..."></textarea>
						</div>
						<div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
							<div className="flex space-x-4 text-gray-500">
								<button className="hover:text-indigo-600 transition-colors">
									<ImageIcon className="w-5 h-5" />
								</button>
								<button className="hover:text-indigo-600 transition-colors">
									<VideoIcon className="w-5 h-5" />
								</button>
								<button className="hover:text-indigo-600 transition-colors">
									<MicIcon className="w-5 h-5" />
								</button>
							</div>
							<button className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
								<PlusIcon className="w-4 h-4 mr-2" /> Post
							</button>
						</div>
					</div>

					{/* Search and Filter Section */}
					<div className="bg-white p-4 rounded-xl shadow-md mb-6">
						<div className="flex flex-col sm:flex-row gap-4">
							{/* Search Input */}
							<div className="relative flex-grow">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<SearchIcon className="w-5 h-5 text-gray-400" />
								</div>
								<input type="text" placeholder="Search announcements..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
							</div>
						</div>
						{/* Filter Buttons */}
						<div className="mt-4 flex flex-wrap gap-2">
							{categories.map(category => (
								<button key={category} onClick={() => setActiveFilter(category)} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeFilter === category ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
									{category}
								</button>
							))}
						</div>
					</div>

					{/* Announcements Feed */}
					<div className="space-y-6">
						{filteredAnnouncements.length > 0 ? (
							filteredAnnouncements.map(announcement => <AnnouncementCard key={announcement.id} announcement={announcement} />)
						) : (
							<div className="text-center py-10 bg-white rounded-xl shadow-md">
								<p className="text-gray-500">No announcements match your criteria.</p>
							</div>
						)}
					</div>
				</div>

				{/* Right Sidebar */}
				<div className="col-span-12 lg:col-span-4">
					<div className="sticky top-8">
						<div className="bg-white p-5 rounded-xl shadow-md">
							<h3 className="font-bold text-gray-800 mb-4">Trending Topics</h3>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-sm text-indigo-600 hover:underline">
										#KeynoteSpeakers
									</a>
								</li>
								<li>
									<a href="#" className="text-sm text-indigo-600 hover:underline">
										#NetworkingDinner
									</a>
								</li>
								<li>
									<a href="#" className="text-sm text-indigo-600 hover:underline">
										#StartupPitches
									</a>
								</li>
								<li>
									<a href="#" className="text-sm text-indigo-600 hover:underline">
										#InnovationAwards
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementsPage;
