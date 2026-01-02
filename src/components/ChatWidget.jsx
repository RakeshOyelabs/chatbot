import { useState, useEffect } from 'react';
import ChatModal from './ChatModal';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Open chat"
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        >
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-bounce flex items-center justify-center">
              <span className="text-xs font-bold">1</span>
            </div>
          )}

          <div className="relative w-8 h-8">
            <svg
              className={`absolute inset-0 transition-all duration-300 ${
                isHovered ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>

            <svg
              className={`absolute inset-0 transition-all duration-300 ${
                isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

          {hasNewMessage && (
            <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-75"></div>
          )}
        </button>
      )}

      {isOpen && <ChatModal onClose={handleToggle} />}
    </>
  );
};

export default ChatWidget;
