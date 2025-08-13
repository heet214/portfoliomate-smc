import React from 'react';

function ChatMessage({ message }) {
  const { text, time, me } = message;

  const bubbleClasses = me
    ? 'bg-indigo-600 text-white'
    : 'bg-white text-gray-800 border border-gray-200';
  
  const containerClasses = me
    ? 'flex justify-end'
    : 'flex justify-start';

  return (
    <div className={containerClasses}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${bubbleClasses}`}>
        <p className="text-sm">{text}</p>
        <p className={`text-xs mt-1 ${me ? 'text-indigo-200' : 'text-gray-400'} text-right`}>
          {time}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
