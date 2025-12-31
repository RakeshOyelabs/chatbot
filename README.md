# React Chatbot Widget

A beautiful, embeddable chatbot widget built with React and Tailwind CSS. Can be integrated into any website or application.

![Chatbot Widget](https://img.shields.io/badge/React-19.2.3-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4.1-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

- Beautiful, modern UI with smooth animations
- Floating chat button that opens a chat modal
- Fully responsive design
- Easy to embed in any website using iframe
- Built with React and Tailwind CSS
- Customizable colors and styles
- Works with any tech stack

## Quick Start

### Method 1: iframe Embed (For Third-Party Websites)

Perfect for embedding the chatbot in WordPress, Shopify, or any website you don't control directly.

1. **Deploy the chatbot** (see Deployment section below)

2. **Add this code to any HTML page:**

```html
<iframe
  src="https://YOUR-CHATBOT-URL.com/chatbot-embed.html"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999; pointer-events: none;"
  allow="clipboard-read; clipboard-write">
</iframe>
```

See [QUICK_START_IFRAME.md](./QUICK_START_IFRAME.md) for detailed instructions.

### Method 2: Direct Integration (For React Projects)

1. **Copy the components to your project:**
   - `src/components/ChatWidget.jsx`
   - `src/components/ChatModal.jsx`
   - `src/components/Message.jsx`

2. **Install Tailwind CSS** (if not already installed):
```bash
npm install -D tailwindcss @tailwindcss/postcss
```

3. **Import and use:**
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

See [CHATBOT_USAGE.md](./CHATBOT_USAGE.md) for detailed instructions.

## Installation

```bash
# Clone or download this repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ChatWidget.jsx       # Floating chat button
│   │   ├── ChatModal.jsx        # Chat interface modal
│   │   └── Message.jsx          # Message component
│   ├── App.jsx                  # Demo application
│   ├── main.jsx                 # Main entry point
│   ├── main-embed.jsx           # Embed entry point
│   └── index.css                # Tailwind CSS
├── public/
│   └── embed.js                 # JavaScript embed script
├── chatbot-embed.html           # Standalone embed page
├── demo-third-party-site.html   # Demo of iframe embedding
└── README.md
```

## Deployment

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --dir=dist --prod
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

### Deploy to GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder to your GitHub repository
3. Enable GitHub Pages in repository settings
4. Select the branch and `/dist` folder

### Deploy to Any Web Server

Simply upload the contents of the `dist` folder to your web server.

## Testing Locally with iframe

1. Start the dev server: `npm run dev`
2. Open `demo-third-party-site.html` in your browser
3. The chatbot will load via iframe from localhost

## Customization

### Change Colors

Edit the Tailwind CSS classes in the components:

```jsx
// Change from purple to blue
className="bg-purple-600"
// to
className="bg-blue-600"
```

### Connect to Backend API

Update the `handleSend` function in `ChatModal.jsx`:

```javascript
const handleSend = async () => {
  // Your API call here
  const response = await fetch('your-api-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

### Change Position

The chatbot appears in the bottom-right by default. To change:

```jsx
// In ChatWidget.jsx, change:
className="fixed bottom-6 right-6..."
// To bottom-left:
className="fixed bottom-6 left-6..."
```

## Documentation

- [QUICK_START_IFRAME.md](./QUICK_START_IFRAME.md) - Quick guide for iframe embedding
- [IFRAME_EMBED_GUIDE.md](./IFRAME_EMBED_GUIDE.md) - Complete iframe embedding documentation
- [CHATBOT_USAGE.md](./CHATBOT_USAGE.md) - Direct integration guide

## Use Cases

- Customer support chatbot
- AI assistant for websites
- Help desk widget
- Live chat interface
- Virtual assistant
- FAQ bot

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- React 19.2.3
- Tailwind CSS 4.1
- Vite 7.2
- JavaScript

## License

MIT License - feel free to use this in your projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions or issues, please create an issue in the repository.

## Demo

Run `npm run dev` and open http://localhost:5173 to see the chatbot in action!

For iframe demo, open `demo-third-party-site.html` in your browser.
