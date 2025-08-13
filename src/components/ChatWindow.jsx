import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const PaperclipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;


function ChatWindow({ chat, onBack }) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [chat.messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        console.log('Sending message:', newMessage);
        // In a real app, you would update state and call an API here.
        // For this demo, we'll just clear the input.
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Chat Header */}
            <div className="flex items-center p-3 border-b border-gray-200 bg-white flex-shrink-0">
                <button onClick={onBack} className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-100">
                    <BackIcon />
                </button>
                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
                <h3 className="font-semibold text-gray-800">{chat.name}</h3>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    <div className="text-center text-xs text-gray-500">Thursday, July 3, 2025</div>
                    {chat.messages.map(msg => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <button type="button" className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                        <PaperclipIcon />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="w-full h-10 px-4 border border-gray-300 rounded-full text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button type="submit" className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-opacity" disabled={!newMessage.trim()}>
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatWindow;
