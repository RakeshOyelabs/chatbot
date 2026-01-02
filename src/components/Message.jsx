import { memo, useState } from 'react';

const Message = memo(function Message({ message, isLatest }) {
  const [imageError, setImageError] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const isImage = message.type === 'image' && message.imageUrl;
  const isFile = message.type === 'file' && message.fileName;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-2 animate-slideIn ${
        message.isBot ? 'justify-start' : 'justify-end'
      }`}
      role="article"
      aria-label={`Message from ${message.isBot ? 'assistant' : 'you'}`}
    >
      {message.isBot && (
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md"
          aria-hidden="true"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[75%] ${message.isBot ? 'items-start' : 'items-end'}`}>
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md ${
            message.isBot
              ? 'bg-gray-100 text-gray-900 rounded-tl-sm'
              : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm'
          }`}
        >
          {isImage && !imageError ? (
            <div className="space-y-2">
              <img
                src={message.imageUrl}
                alt={message.text || 'Uploaded image'}
                className="rounded-lg max-w-full h-auto max-h-64 object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
              />
              {message.text && (
                <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
              )}
            </div>
          ) : isFile ? (
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                message.isBot ? 'bg-gray-200' : 'bg-blue-500'
              }`}>
                <svg className={`w-6 h-6 ${message.isBot ? 'text-gray-600' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">{message.fileName}</p>
                {message.fileSize && (
                  <p className={`text-xs ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                    {(message.fileSize / 1024).toFixed(1)} KB
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
              {message.text}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 px-1">
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>

          {!message.isBot && (
            <div className="flex items-center gap-1" aria-label="Message status">
              {message.status === 'sending' && (
                <svg className="w-4 h-4 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {message.status === 'sent' && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {message.status === 'read' && (
                <div className="flex -space-x-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>

        {isLatest && message.isBot && (
          <div className="flex gap-2 mt-1">
            <button
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Helpful response"
              onClick={() => console.log('Thumbs up')}
            >
              👍
            </button>
            <button
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Not helpful response"
              onClick={() => console.log('Thumbs down')}
            >
              👎
            </button>
          </div>
        )}
      </div>

      {!message.isBot && (
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-md"
          aria-hidden="true"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  );
});

export default Message;
