# Chatbot Usage Guide

Complete guide for using and customizing the enterprise-grade chat widget.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Features Overview](#features-overview)
3. [User Guide](#user-guide)
4. [Developer Guide](#developer-guide)
5. [Customization](#customization)
6. [API Integration](#api-integration)

---

## Quick Start

### For End Users

1. **Open Chat**: Click the blue floating button in bottom-right corner
2. **Send Message**: Type your message and press Enter or click send button
3. **Add Emoji**: Click the smiley face icon to select emojis
4. **Attach File**: Click the paperclip icon to upload images or documents
5. **Clear History**: Click the trash icon in header to clear all messages

### For Developers

```jsx
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div>
      <YourContent />
      <ChatWidget />
    </div>
  );
}
```

---

## Features Overview

### Core Features

#### 1. Messaging
- **Text Messages**: Send and receive text messages
- **Multi-line Support**: Use Shift+Enter for new lines
- **Message Status**: See when messages are sending, sent, or read
- **Read Receipts**: Double checkmarks when message is read
- **Timestamps**: Every message shows time sent

#### 2. Rich Content
- **Emojis**: Two categories with 15+ emojis each
- **Images**: Upload and preview images directly in chat
- **Files**: Attach PDFs, Word docs, and text files
- **File Info**: See file names and sizes

#### 3. Notifications
- **Sound Effects**: Subtle audio feedback for actions
- **Desktop Notifications**: Get alerts when chat is minimized
- **Visual Badge**: Red dot shows when new message arrives
- **Auto-popup**: Chat prompts after 5 seconds (customizable)

#### 4. Persistence
- **Message History**: Last 100 messages saved automatically
- **Session Restore**: Previous conversation loads on page reload
- **Clear Option**: Remove all history with one click

#### 5. Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and roles
- **Focus Management**: Proper focus handling
- **High Contrast**: Accessible color contrasts

---

## User Guide

### Sending Messages

**Text Message:**
1. Click the chat button to open
2. Type your message in the input box
3. Press Enter or click the send button

**With Emoji:**
1. Click the smiley face icon
2. Choose a category (Smileys or Objects)
3. Click an emoji to insert it
4. Type your message and send

**With File:**
1. Click the paperclip icon
2. Select an image or document
3. File preview appears in chat
4. Optionally add text and send

### Managing Chat

**Mute/Unmute Sounds:**
- Click the speaker icon in the header
- Muted: Shows muted speaker icon
- Unmuted: Shows normal speaker icon

**Enable Notifications:**
1. Click the bell icon in header
2. Allow browser notification permission
3. You'll get notifications when chat is hidden

**Clear History:**
1. Click the trash icon in header
2. Confirm the action
3. All messages are deleted
4. Fresh welcome message appears

**Close Chat:**
- Click the down arrow icon in header
- Or click the floating button again

### Understanding Message States

**Your Messages:**
- **Sending**: Spinner icon - message is being sent
- **Sent**: Single checkmark - message delivered
- **Read**: Double checkmark - message read by bot

**Bot Messages:**
- Always show as "read" status
- Include bot avatar icon
- Gray background color
- Thumbs up/down feedback buttons on latest message

---

## Developer Guide

### Component Structure

```
src/
├── components/
│   ├── ChatWidget.jsx        # Main widget with floating button
│   ├── ChatModal.jsx          # Chat interface container
│   ├── Message.jsx            # Individual message component
│   ├── TypingIndicator.jsx   # Typing animation
│   └── EmojiPicker.jsx        # Emoji selector
├── utils/
│   ├── messageStorage.js     # LocalStorage operations
│   ├── soundEffects.js       # Audio feedback
│   └── notifications.js      # Browser notifications
├── index.css                  # Styles and animations
└── main.jsx                   # Entry point
```

### Key Components

#### ChatWidget
The main container component that manages the widget state.

**Props:** None

**State:**
- `isOpen`: Boolean - chat window open/closed
- `hasNewMessage`: Boolean - new message indicator
- `isHovered`: Boolean - hover state for animations

**Features:**
- Floating button with animations
- Auto-popup after 5 seconds
- Badge notification for new messages
- Icon transition on hover

#### ChatModal
The chat interface with full functionality.

**Props:**
- `onClose`: Function - callback to close modal

**State:**
- `messages`: Array - all chat messages
- `inputValue`: String - current input text
- `isTyping`: Boolean - bot typing state
- `showEmojiPicker`: Boolean - emoji picker visibility
- `soundEnabled`: Boolean - sound effects toggle
- `notificationsEnabled`: Boolean - notifications toggle

**Features:**
- Message list with auto-scroll
- File upload handling
- Emoji picker integration
- Sound and notification controls
- Message persistence

#### Message
Displays individual messages with rich content.

**Props:**
- `message`: Object - message data
- `isLatest`: Boolean - whether this is the latest message

**Message Object:**
```javascript
{
  id: Number,
  text: String,
  isBot: Boolean,
  timestamp: Date,
  status: String, // 'sending', 'sent', 'read'
  type: String, // 'text', 'image', 'file'
  imageUrl: String, // for images
  fileName: String, // for files
  fileSize: Number // for files
}
```

### Utility Functions

#### messageStorage.js
```javascript
import { saveMessages, loadMessages, clearMessages } from './utils/messageStorage';

// Save messages
saveMessages(messagesArray);

// Load messages
const messages = loadMessages();

// Clear all messages
clearMessages();
```

#### soundEffects.js
```javascript
import soundEffects from './utils/soundEffects';

// Play sounds
soundEffects.playMessageSent();
soundEffects.playMessageReceived();
soundEffects.playNotification();

// Toggle sounds
const isEnabled = soundEffects.toggle();
```

#### notifications.js
```javascript
import notificationManager from './utils/notifications';

// Request permission
const granted = await notificationManager.requestPermission();

// Show notification
notificationManager.showNotification('Title', {
  body: 'Message text',
  tag: 'unique-tag'
});

// Show message notification
notificationManager.showNewMessage(messageObject);
```

---

## Customization

### Colors

Edit Tailwind classes in components:

**Primary Color (Blue):**
```jsx
// Change from blue to green
className="bg-blue-600" → className="bg-green-600"
className="text-blue-600" → className="text-green-600"
```

**Secondary Colors:**
```jsx
// Message bubbles
className="bg-gray-100" // Bot messages
className="bg-blue-600" // User messages
```

### Position

**Change Widget Position:**
```jsx
// In ChatWidget.jsx and ChatModal.jsx
className="fixed bottom-6 right-6" // Bottom-right (default)
className="fixed bottom-6 left-6"  // Bottom-left
className="fixed top-6 right-6"    // Top-right
className="fixed top-6 left-6"     // Top-left
```

### Animations

**Disable Animations:**
Remove animation classes:
```jsx
// Remove these classes
className="animate-slideIn"
className="animate-slideUp"
className="transition-all duration-300"
```

**Custom Animation Speed:**
```css
/* In index.css */
.animate-slideIn {
  animation: slideIn 0.5s ease-out; /* Change 0.3s to 0.5s */
}
```

### Welcome Message

**Change Welcome Message:**
```jsx
// In ChatModal.jsx, useEffect
const welcomeMessage = {
  text: 'Your custom welcome message here!',
  // ... rest of properties
};
```

### Bot Name

**Change Bot Name:**
```jsx
// In ChatModal.jsx, header section
<h2 className="font-semibold text-lg">Your Bot Name</h2>
<p className="text-xs text-blue-100">Your Status</p>
```

### Auto-popup Timing

**Change Delay:**
```jsx
// In ChatWidget.jsx, useEffect
setTimeout(() => {
  setHasNewMessage(true);
}, 10000); // Change 5000 to 10000 for 10 seconds
```

### Message Storage Limit

**Change Storage Limit:**
```javascript
// In messageStorage.js
const MAX_STORED_MESSAGES = 200; // Change from 100 to 200
```

---

## API Integration

### Connecting to Real Backend

Replace the simulated bot response with actual API calls:

```jsx
// In ChatModal.jsx

const simulateBotResponse = useCallback(async (userMessage) => {
  setIsTyping(true);

  try {
    // Replace with your API endpoint
    const response = await fetch('https://your-api.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        message: userMessage.text,
        conversationId: 'unique-id'
      })
    });

    const data = await response.json();

    const botResponse = {
      id: Date.now(),
      text: data.reply,
      isBot: true,
      timestamp: new Date(),
      status: 'read'
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);

    if (soundEnabled) {
      soundEffects.playMessageReceived();
    }

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = {
      id: Date.now(),
      text: 'Sorry, I encountered an error. Please try again.',
      isBot: true,
      timestamp: new Date(),
      status: 'read'
    };
    setMessages(prev => [...prev, errorMessage]);
    setIsTyping(false);
  }
}, [soundEnabled]);
```

### File Upload to Server

```jsx
const handleFileSelect = useCallback(async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    // Upload file to server
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://your-api.com/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    const fileMessage = {
      id: Date.now(),
      text: '',
      isBot: false,
      timestamp: new Date(),
      status: 'sent',
      type: file.type.startsWith('image/') ? 'image' : 'file',
      fileName: file.name,
      fileSize: file.size,
      imageUrl: data.url // URL from server
    };

    setMessages(prev => [...prev, fileMessage]);

  } catch (error) {
    console.error('Upload Error:', error);
    alert('Failed to upload file');
  }
}, []);
```

---

## Best Practices

### Performance
1. Use React.memo for Message components
2. Implement virtual scrolling for 1000+ messages
3. Lazy load images
4. Debounce typing indicators
5. Minimize state updates

### Security
1. Sanitize user input
2. Validate file uploads
3. Use HTTPS for API calls
4. Implement rate limiting
5. Handle errors gracefully

### User Experience
1. Show loading states
2. Provide clear feedback
3. Handle offline states
4. Respect user preferences
5. Smooth animations (60fps)

### Accessibility
1. Proper ARIA labels
2. Keyboard navigation
3. Screen reader support
4. Color contrast compliance
5. Focus management

---

## Troubleshooting

### Chat Not Opening
- Check z-index conflicts
- Verify JavaScript is loaded
- Check console for errors

### Messages Not Persisting
- Check localStorage availability
- Verify browser allows localStorage
- Check for quota exceeded errors

### Notifications Not Working
- Request permission properly
- Check browser settings
- Test on HTTPS (required for notifications)

### Poor Performance
- Check message count (limit to 100)
- Optimize re-renders
- Use production build
- Check for memory leaks

---

## Support

For questions or issues:
1. Check the [FEATURES.md](./FEATURES.md) documentation
2. Review [IFRAME_EMBED_GUIDE.md](./IFRAME_EMBED_GUIDE.md) for embedding
3. See [README.md](./README.md) for general information

---

## License

MIT License - Free to use in your projects!
