import React from 'react';

const ChatBubbleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-50 p-8">
        <div className="relative mb-4">
            <div className="absolute -top-4 -left-8 animate-pulse">
                <div className="w-16 h-16 bg-pink-300 rounded-full opacity-50"></div>
            </div>
            <div className="absolute -bottom-4 -right-8 animate-pulse delay-500">
                <div className="w-20 h-20 bg-purple-300 rounded-full opacity-50"></div>
            </div>
            <ChatBubbleIcon />
        </div>
      <h2 className="text-xl font-semibold text-gray-800">Welcome to your Inbox</h2>
      <p className="text-gray-500 mt-2 max-w-xs">
        Select a conversation from the list to start chatting with investors & other members.
      </p>
    </div>
  );
}

export default ChatWelcome;
