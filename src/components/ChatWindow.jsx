import { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Hi! welcome to oyelabs',
      sender: 'Customer Support',
    },
    {
      id: 2,
      type: 'user',
      text: 'hi',
    },
    {
      id: 3,
      type: 'bot',
      text: '👋 Hi there! How can I assist you today?',
      sender: 'oyelabs ai',
    },
    {
      id: 4,
      type: 'user',
      text: 'good morning',
    },
    {
      id: 5,
      type: 'bot',
      text: 'Good morning! How can I help you today?',
      sender: 'oyelabs ai',
    },
  ]);

  const handleSendMessage = (text) => {
    if (text.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: text.trim(),
      };
      setMessages([...messages, newMessage]);

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: 'Thank you for your message! How else can I assist you?',
          sender: 'oyelabs ai',
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatWindow;
