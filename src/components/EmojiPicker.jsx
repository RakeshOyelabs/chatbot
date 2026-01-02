import { useState } from 'react';

const EMOJI_CATEGORIES = {
  smileys: ['😊', '😂', '🥰', '😍', '🤗', '🤔', '😎', '🥳', '😭', '😅', '👍', '👏', '🙌', '👋', '🤝'],
  objects: ['💼', '📱', '💻', '⌚', '📧', '📎', '📁', '📊', '📈', '💡', '🔔', '🎁', '🎉', '⭐', '❤️']
};

export default function EmojiPicker({ onEmojiSelect, onClose }) {
  const [activeCategory, setActiveCategory] = useState('smileys');

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-3 w-72 animate-slideUp">
      <div className="flex gap-2 mb-3 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveCategory('smileys')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            activeCategory === 'smileys'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Smileys
        </button>
        <button
          onClick={() => setActiveCategory('objects')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            activeCategory === 'objects'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Objects
        </button>
      </div>

      <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto">
        {EMOJI_CATEGORIES[activeCategory].map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              onEmojiSelect(emoji);
              onClose();
            }}
            className="text-2xl p-2 hover:bg-gray-100 rounded-md transition-colors transform hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
