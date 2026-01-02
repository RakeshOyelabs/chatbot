import { useEffect, useRef } from 'react';

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((message, index) => (
        <div key={message.id} className="mb-4">
          {message.type === 'bot' && message.sender && (
            <div className="text-xs text-gray-500 mb-1 ml-12">
              {message.sender}
            </div>
          )}
          <div
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'bot' && (
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.type === 'user'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-green-600 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
