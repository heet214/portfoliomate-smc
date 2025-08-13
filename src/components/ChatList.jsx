import React, { useState } from "react";

const SearchIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</svg>
);

const ChatListItem = ({ chat, isSelected, onSelect }) => (
	<button onClick={() => onSelect(chat.id)} className={`w-full text-left p-3 flex items-start gap-3 border-b border-gray-100 transition-colors ${isSelected ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
		<img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full flex-shrink-0" />
		<div className="flex-grow min-w-0">
			<div className="flex justify-between items-center">
				<p className={`font-semibold text-sm truncate ${isSelected ? "text-indigo-800" : "text-gray-800"}`}>{chat.name}</p>
				<p className={`text-xs flex-shrink-0 ${isSelected ? "text-indigo-600" : "text-gray-500"}`}>{chat.time}</p>
			</div>
			<div className="flex justify-between items-center mt-1">
				<p className="text-xs text-gray-500 truncate pr-2">{chat.lastMessage}</p>
				{chat.unread > 0 && <span className="bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0">{chat.unread}</span>}
			</div>
		</div>
	</button>
);

function ChatList({ chats, selectedChatId, onSelectChat }) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b border-gray-200">
				<h2 className="text-xl font-bold text-gray-900 mb-4">Inbox</h2>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<SearchIcon />
					</div>
					<input type="text" placeholder="Search Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full h-10 pl-9 pr-3 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500" />
				</div>
			</div>
			<div className="flex-grow overflow-y-auto">
				{filteredChats.map(chat => (
					<ChatListItem key={chat.id} chat={chat} isSelected={chat.id === selectedChatId} onSelect={onSelectChat} />
				))}
			</div>
		</div>
	);
}

export default ChatList;
