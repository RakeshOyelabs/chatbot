import { useState, useRef, useEffect, useCallback } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import EmojiPicker from './EmojiPicker';
import { saveMessages, loadMessages, clearMessages } from '../utils/messageStorage';
import soundEffects from '../utils/soundEffects';
import notificationManager from '../utils/notifications';

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const savedMessages = loadMessages();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      const welcomeMessage = {
        id: Date.now(),
        text: 'Hey there! 👋\n\nI\'m your AI assistant. How can I help you today?',
        isBot: true,
        timestamp: new Date(),
        status: 'read'
      };
      setMessages([welcomeMessage]);
      saveMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const simulateBotResponse = useCallback((userMessage) => {
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I understand what you're looking for. Here's what I can tell you...",
        "Thanks for reaching out! I'm here to assist you.",
        "I'd be happy to help you with that!",
        "Let me provide you with some information about that.",
        "Great! I can definitely help you with this.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botResponse = {
        id: Date.now(),
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
        status: 'read'
      };

      setMessages(prev => {
        const updated = prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'read' } : msg
        );
        return [...updated, botResponse];
      });
      setIsTyping(false);

      if (soundEnabled) {
        soundEffects.playMessageReceived();
      }

      if (notificationsEnabled && document.hidden) {
        notificationManager.showNewMessage(botResponse);
      }
    }, 1500 + Math.random() * 1000);
  }, [soundEnabled, notificationsEnabled]);

  const handleSend = useCallback(() => {
    if (inputValue.trim() === '') return;

    const newUserMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setShowEmojiPicker(false);

    if (soundEnabled) {
      soundEffects.playMessageSent();
    }

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newUserMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 300);

    simulateBotResponse(newUserMessage);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [inputValue, soundEnabled, simulateBotResponse]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleEmojiSelect = useCallback((emoji) => {
    setInputValue(prev => prev + emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileMessage = {
      id: Date.now(),
      text: '',
      isBot: false,
      timestamp: new Date(),
      status: 'sent',
      type: file.type.startsWith('image/') ? 'image' : 'file',
      fileName: file.name,
      fileSize: file.size
    };

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileMessage.imageUrl = e.target.result;
        setMessages(prev => [...prev, fileMessage]);
        if (soundEnabled) {
          soundEffects.playMessageSent();
        }
      };
      reader.readAsDataURL(file);
    } else {
      setMessages(prev => [...prev, fileMessage]);
      if (soundEnabled) {
        soundEffects.playMessageSent();
      }
    }

    e.target.value = '';
  }, [soundEnabled]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
      const welcomeMessage = {
        id: Date.now(),
        text: 'Hey there! 👋\n\nI\'m your AI assistant. How can I help you today?',
        isBot: true,
        timestamp: new Date(),
        status: 'read'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const toggleSound = useCallback(() => {
    const newState = soundEffects.toggle();
    setSoundEnabled(newState);
  }, []);

  const toggleNotifications = useCallback(async () => {
    if (!notificationsEnabled) {
      const granted = await notificationManager.requestPermission();
      setNotificationsEnabled(granted);
    } else {
      setNotificationsEnabled(false);
    }
  }, [notificationsEnabled]);

  const handleTextareaChange = useCallback((e) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }, []);

  if (isMinimized) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-slideUp"
      role="dialog"
      aria-label="Chat window"
      style={{ height: '550px', maxHeight: 'calc(100vh - 80px)' }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">AI Assistant</h2>
            <p className="text-xs text-blue-100">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          <button
            onClick={toggleNotifications}
            className="hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
            title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <button
            onClick={handleClearHistory}
            className="hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label="Clear chat history"
            title="Clear chat history"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white" role="log" aria-live="polite">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-3 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 relative">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Attach file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Write a message..."
              rows="1"
              className="w-full bg-transparent px-2 py-1 focus:outline-none resize-none overflow-hidden text-gray-700 placeholder-gray-400"
              style={{ maxHeight: '120px' }}
              aria-label="Message input"
            />
          </div>

          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Add emoji"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}

          <button
            onClick={handleSend}
            disabled={inputValue.trim() === ''}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        <div className="mt-1.5 flex items-center justify-center">
          <p className="text-xs text-gray-400">
            Powered by AI • Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
