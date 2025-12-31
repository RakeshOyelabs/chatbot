# Chatbot Widget - Usage Guide

This chatbot widget is a reusable React component that can be easily integrated into any React project.

## Features

- Floating chat button with smooth animations
- Beautiful, responsive chat modal interface
- Easy to customize and extend
- Built with React and Tailwind CSS
- Works with any React application

## Installation & Usage

### Option 1: Direct Integration (Recommended for React Projects)

1. **Copy the chatbot components to your project:**
   - Copy the `src/components/ChatWidget.jsx`
   - Copy the `src/components/ChatModal.jsx`
   - Copy the `src/components/Message.jsx`

2. **Make sure you have Tailwind CSS installed:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure Tailwind in your `tailwind.config.js`:**
   ```javascript
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. **Add Tailwind directives to your CSS file:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Import and use the ChatWidget in your app:**
   ```jsx
   import ChatWidget from './components/ChatWidget';

   function App() {
     return (
       <div>
         {/* Your app content */}
         <ChatWidget />
       </div>
     );
   }
   ```

### Option 2: Build as Standalone Widget

If you want to use this in non-React projects or load it via CDN:

1. **Build the widget:**
   ```bash
   npm run build
   ```

2. **The built files will be in the `dist` folder**

3. **Include in your HTML:**
   ```html
   <script src="path/to/chatbot-widget.js"></script>
   <link rel="stylesheet" href="path/to/chatbot-widget.css">
   ```

## Customization

### Changing Colors

The chatbot uses purple/blue gradients by default. To change colors, edit the Tailwind classes in:

- `ChatWidget.jsx` - For the floating button
- `ChatModal.jsx` - For the modal header and send button
- `Message.jsx` - For message bubbles

### Customizing Bot Responses

Edit the `handleSend` function in `ChatModal.jsx` to integrate with your own backend or AI service:

```javascript
const handleSend = async () => {
  // Add your API call here
  const response = await fetch('your-api-endpoint', {
    method: 'POST',
    body: JSON.stringify({ message: inputValue })
  });
  const data = await response.json();

  // Add bot response
  setMessages(prev => [...prev, {
    id: Date.now(),
    text: data.response,
    isBot: true,
    timestamp: new Date()
  }]);
};
```

### Changing Position

The widget is positioned in the bottom-right by default. To change this, update the classes in `ChatWidget.jsx`:

```jsx
// Bottom-right (default)
className="fixed bottom-6 right-6..."

// Bottom-left
className="fixed bottom-6 left-6..."

// Top-right
className="fixed top-6 right-6..."
```

## Component Structure

- **ChatWidget.jsx** - Main widget with floating button
- **ChatModal.jsx** - Chat interface modal
- **Message.jsx** - Individual message component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
