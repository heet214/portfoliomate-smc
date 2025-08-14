import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import ChatWelcome from '../components/ChatWelcome';
import { getAllUsers } from '../apis';
import { useAuth } from '../context/AuthContext';
import { createChatRoomId } from '../utils/chatUtils';

function ChatPage() {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAllUsers(users);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const chatRoomId = selectedUser ? createChatRoomId(user.userId, selectedUser.userId) : null;

  return (
    <div className="flex flex-1 h-full bg-white border-t border-gray-200">
      <div 
        className={`flex-shrink-0 border-r border-gray-200 flex flex-col w-full md:w-[320px] lg:w-[360px] ${selectedUser ? 'hidden md:flex' : 'flex'}`}
      >
        <ChatList 
            users={allUsers} 
            selectedUserId={selectedUser?.userId} 
            onSelectUser={setSelectedUser} 
            loading={loading}
            error={error}
        />
      </div>
      
      <div className={`flex-1 flex-col ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
        {selectedUser && chatRoomId ? (
          <ChatWindow 
            recipient={selectedUser} 
            chatRoomId={chatRoomId}
            onBack={() => setSelectedUser(null)} 
          />
        ) : (
          <ChatWelcome />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
