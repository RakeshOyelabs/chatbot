const Message = ({ message }) => {
  const { text, isBot } = message;

  if (isBot) {
    return (
      <div className="flex items-start gap-2 mb-4">
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-xs">
          <div className="text-gray-800 whitespace-pre-line">{text}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-4">
      <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-xs">
        <div className="whitespace-pre-line">{text}</div>
      </div>
    </div>
  );
};

export default Message;
