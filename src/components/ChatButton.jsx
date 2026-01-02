function ChatButton({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className={`${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } transition-opacity duration-200 fixed bottom-6 right-6 w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full shadow-lg flex items-center justify-center group`}
      aria-label="Open chat"
    >
      <div className="relative">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
          1
        </span>
      </div>
    </button>
  );
}

export default ChatButton;
