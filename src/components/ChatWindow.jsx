import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore instance
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { sendMessage } from '../apis';
import { useAuth } from '../context/AuthContext';
import ChatMessage from './ChatMessage';

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const PaperclipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;

function ChatWindow({ recipient, chatRoomId, onBack }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Set up real-time listener for messages
    useEffect(() => {
        if (!chatRoomId) return;

        const messagesRef = collection(db, 'chats', chatRoomId, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
        });

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, [chatRoomId]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const messageData = {
            recipientId: recipient.userId,
            text: newMessage,
            chatRoomId,
        };
        
        setNewMessage(''); // Clear input immediately for better UX
        try {
            await sendMessage(messageData);
        } catch (error) {
            console.error("Failed to send message:", error);
            // Optionally, handle the error in the UI, e.g., show a "failed to send" indicator
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="flex items-center p-3 border-b border-gray-200 bg-white flex-shrink-0">
                <button onClick={onBack} className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-100"><BackIcon /></button>
                <img src={recipient.photoURL || `https://ui-avatars.com/api/?name=${recipient.displayName}&background=E2E8F0&color=4A5568`} alt={recipient.displayName} className="w-10 h-10 rounded-full mr-3" />
                <h3 className="font-semibold text-gray-800">{recipient.displayName}</h3>
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map(msg => (
                        <ChatMessage key={msg.id} message={msg} currentUser={user} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <button type="button" className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"><PaperclipIcon /></button>
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" className="w-full h-10 px-4 border border-gray-300 rounded-full text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <button type="submit" className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-opacity" disabled={!newMessage.trim()}><SendIcon /></button>
                </form>
            </div>
        </div>
    );
}

export default ChatWindow;
