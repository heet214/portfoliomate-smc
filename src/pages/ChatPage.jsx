import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import ChatWelcome from '../components/ChatWelcome';
import { chatListData, messageData } from '../data/data';

function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const selectedChat = selectedChatId
    ? {
        ...chatListData.find(c => c.id === selectedChatId),
        messages: messageData[selectedChatId] || [],
      }
    : null;

  return (
    // The main container now grows to fill the available space from App.js
    <div className="flex flex-1 h-full bg-white">
      {/* Chat List Pane: Fixed width on desktop, full width on mobile */}
      <div 
        className={`
          flex-shrink-0 border-r border-gray-200 flex flex-col
          w-full md:w-[320px] lg:w-[360px]
          ${selectedChatId ? 'hidden md:flex' : 'flex'}
        `}
      >
        <ChatList 
            chats={chatListData} 
            selectedChatId={selectedChatId} 
            onSelectChat={setSelectedChatId} 
        />
      </div>
      
      {/* Chat Window Pane: Fills remaining space on desktop */}
      <div 
        className={`
          flex-1 flex-col
          ${selectedChatId ? 'flex' : 'hidden md:flex'}
        `}
      >
        {selectedChat ? (
          <ChatWindow 
            chat={selectedChat} 
            onBack={() => setSelectedChatId(null)} 
          />
        ) : (
          <ChatWelcome />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
