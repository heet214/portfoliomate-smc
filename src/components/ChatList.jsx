import React, { useState } from 'react';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;

const UserListItem = ({ user, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(user)}
    className={`w-full text-left p-3 flex items-center gap-3 border-b border-gray-100 transition-colors ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
  >
    <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=E2E8F0&color=4A5568`} alt={user.displayName} className="w-10 h-10 rounded-full flex-shrink-0" />
    <div className="flex-grow min-w-0">
        <p className={`font-semibold text-sm truncate ${isSelected ? 'text-indigo-800' : 'text-gray-800'}`}>{user.displayName}</p>
        <p className="text-xs text-gray-500 truncate pr-2">{user.role}</p>
    </div>
  </button>
);

function ChatList({ users, selectedUserId, onSelectUser, loading, error }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user => user.displayName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contacts</h2>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                    <input type="text" placeholder="Search by name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full h-10 pl-9 pr-3 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                {loading && <div className="p-4 text-center text-gray-500">Loading contacts...</div>}
                {error && <div className="p-4 text-center text-red-500">{error}</div>}
                {!loading && !error && filteredUsers.map(user => (
                    <UserListItem key={user.userId} user={user} isSelected={user.userId === selectedUserId} onSelect={onSelectUser} />
                ))}
            </div>
        </div>
    );
}

export default ChatList;
