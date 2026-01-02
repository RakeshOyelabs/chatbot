const STORAGE_KEY = 'chatbot_messages';
const MAX_STORED_MESSAGES = 100;

export const saveMessages = (messages) => {
  try {
    const messagesToStore = messages.slice(-MAX_STORED_MESSAGES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore));
  } catch (error) {
    console.error('Failed to save messages:', error);
  }
};

export const loadMessages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const messages = JSON.parse(stored);
      return messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [];
  } catch (error) {
    console.error('Failed to load messages:', error);
    return [];
  }
};

export const clearMessages = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear messages:', error);
  }
};
