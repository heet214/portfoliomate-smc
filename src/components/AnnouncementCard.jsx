import React from "react";

const ThumbsUpIcon = props => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.79 1.11L15 5.88Z" />
    </svg>
);

const MessageSquareIcon = props => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const Share2Icon = props => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const PinIcon = props => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
);

const categoryColorClasses = {
    blue: "bg-blue-100 text-blue-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
};

// Native time ago formatter (no date-fns)
const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;

    return "just now";
};

const AnnouncementCard = ({ announcement }) => {
    if (!announcement) return null;

    const { author, role, avatar, timestamp, category, categoryColor, title, content, imageUrl, isPinned } = announcement;

    const timeAgo = timestamp?.seconds
        ? formatTimeAgo(new Date(timestamp.seconds * 1000))
        : "just now";

    return (
        <div className={`bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${isPinned ? "border-2 border-[#312E81]" : ""}`}>
            {isPinned && (
                <div className="bg-[#312E81] text-white text-xs font-bold px-3 py-1 flex items-center">
                    <PinIcon className="w-4 h-4 mr-2 transform -rotate-45" /> PINNED
                </div>
            )}
            <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center mb-3 sm:mb-0">
                        <img className="h-11 w-11 rounded-full object-cover" src={avatar} alt={`${author} avatar`} />
                        <div className="ml-4">
                            <p className="font-bold text-gray-800">{author}</p>
                            <p className="text-xs text-gray-500">{role} &middot; {timeAgo}</p>
                        </div>
                    </div>
                    {category && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium self-start sm:self-center ${categoryColorClasses[categoryColor] || "bg-gray-100 text-gray-800"}`}>
                            {category}
                        </span>
                    )}
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
                </div>
            </div>
            {imageUrl && (
                <div className="mt-4">
                    <img className="w-full h-auto object-cover" src={imageUrl} alt="Announcement visual" />
                </div>
            )}
            <div className="px-6 py-3 bg-gray-50/70 border-t border-gray-200 mt-4">
                <div className="flex justify-around items-center text-gray-600">
                    <button className="flex items-center space-x-2 text-sm font-medium hover:text-[#312E81] hover:bg-[#EBEAF2] p-2 rounded-lg transition-colors">
                        <ThumbsUpIcon className="w-5 h-5" /><span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm font-medium hover:text-[#312E81] hover:bg-[#EBEAF2] p-2 rounded-lg transition-colors">
                        <MessageSquareIcon className="w-5 h-5" /><span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm font-medium hover:text-[#312E81] hover:bg-[#EBEAF2] p-2 rounded-lg transition-colors">
                        <Share2Icon className="w-5 h-5" /><span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;
