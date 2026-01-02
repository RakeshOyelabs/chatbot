# Oyelabs AI Chatbot Widget

A modern, embeddable chatbot widget built with React and Tailwind CSS that can be injected into any third-party website using an iframe.

## Features

- Clean, modern UI with smooth animations
- Expandable/collapsible chat interface
- Green themed design matching the oyelabs brand
- Fully responsive design
- Easy iframe integration for third-party websites
- Real-time message updates
- Notification badge on chat button

## Project Structure

```
src/
├── components/
│   ├── ChatbotWidget.jsx    # Main widget container
│   ├── ChatButton.jsx        # Floating chat button
│   ├── ChatWindow.jsx        # Chat window container
│   ├── ChatHeader.jsx        # Header with branding
│   ├── ChatMessages.jsx      # Messages display
│   └── ChatInput.jsx         # Message input field
├── App.jsx                   # Main app component
├── index.css                 # Global styles and animations
└── main.jsx                  # Entry point
```

## Running the Project

### Development Mode

```bash
npm install
npm run dev
```

The app will run on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage Modes

### 1. Standalone Mode (Default)

Visit `http://localhost:5173` to see the chatbot with demo content showing how it works.

### 2. Embed Mode

Visit `http://localhost:5173?embed=true` to see only the chatbot widget (suitable for iframe embedding).

## Embedding in Third-Party Websites

### Option 1: Using the provided example

1. Build the project: `npm run build`
2. Deploy the dist folder to your server
3. Open `embed-example.html` and update the iframe src to your deployed URL
4. Open `embed-example.html` in a browser to see the demo

### Option 2: Manual integration

Add this code to any HTML page:

```html
<!-- Add this before closing </body> tag -->
<iframe
  src="http://your-domain.com?embed=true"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; pointer-events: none; z-index: 9999;"
  scrolling="no"
></iframe>

<script>
  const iframe = document.querySelector('iframe');
  iframe.style.pointerEvents = 'none';
</script>
```

## Customization

### Colors

The chatbot uses a green color scheme. To customize:

1. Edit the Tailwind classes in the component files
2. Replace `green-600` with your preferred color (e.g., `blue-600`, `purple-600`)
3. Update the hover states accordingly

### Messages

Edit the initial messages in `src/components/ChatWindow.jsx`:

```javascript
const [messages, setMessages] = useState([
  {
    id: 1,
    type: 'bot',
    text: 'Your welcome message here',
    sender: 'Your Bot Name',
  },
  // Add more initial messages
]);
```

### Branding

Update the branding in `src/components/ChatHeader.jsx`:

```javascript
<h2 className="font-semibold text-lg">Your Bot Name</h2>
<p className="text-xs text-green-100">Your Tagline</p>
```

## Components Overview

### ChatbotWidget

Main container that manages the open/close state of the chatbot.

### ChatButton

Floating button with notification badge. Appears when the chat is closed.

### ChatWindow

Container for the entire chat interface with header, messages, and input.

### ChatHeader

Displays the bot name, logo, and control buttons.

### ChatMessages

Renders all messages with proper styling for bot and user messages.

### ChatInput

Input field with send, attach, and emoji buttons.

## Technologies Used

- React 19.2.3
- Tailwind CSS (with PostCSS)
- Vite 7.2.7

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT
