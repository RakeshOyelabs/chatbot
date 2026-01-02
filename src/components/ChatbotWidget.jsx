import { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {isOpen && <ChatWindow onClose={toggleChat} />}
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
    </div>
  );
}

export default ChatbotWidget;
