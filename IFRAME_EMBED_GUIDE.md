# Chatbot iframe Embedding Guide

This guide shows you how to embed the chatbot in any third-party website or application using an iframe.

## Method 1: Simple iframe Embed (Recommended)

Add this code to any HTML page where you want the chatbot to appear:

```html
<iframe
  src="https://your-chatbot-domain.com/chatbot-embed.html"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999; pointer-events: none;"
  allow="clipboard-read; clipboard-write"
  id="chatbot-iframe">
</iframe>

<style>
  #chatbot-iframe {
    pointer-events: none;
  }
  #chatbot-iframe * {
    pointer-events: auto;
  }
</style>
```

**Important:** Replace `https://your-chatbot-domain.com` with your actual hosted chatbot URL.

## Method 2: JavaScript Embed Script

Include this script in your HTML:

```html
<script src="https://your-chatbot-domain.com/embed.js"></script>
```

Or if you want more control:

```html
<script src="https://your-chatbot-domain.com/embed.js"></script>
<script>
  ChatbotWidget.init({
    url: 'https://your-chatbot-domain.com/chatbot-embed.html',
    position: 'bottom-right'
  });
</script>
```

## Method 3: Dynamic iframe Creation

Add this JavaScript code to your page:

```javascript
function loadChatbot() {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://your-chatbot-domain.com/chatbot-embed.html';
  iframe.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(iframe);
}

// Load when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadChatbot);
} else {
  loadChatbot();
}
```

## Deployment Steps

### Step 1: Build Your Chatbot
```bash
npm run build
```

### Step 2: Deploy to Hosting Service

You can deploy the chatbot to any static hosting service:

**Option A: Netlify**
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Deploy: `netlify deploy --dir=dist --prod`
3. Get your deployment URL

**Option B: Vercel**
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel --prod`
3. Get your deployment URL

**Option C: GitHub Pages**
1. Push your code to GitHub
2. Go to Settings > Pages
3. Select your branch and /dist folder
4. Get your GitHub Pages URL

**Option D: Any Web Server**
- Upload the contents of the `dist` folder to your web server
- Ensure `chatbot-embed.html` is accessible

### Step 3: Update iframe URLs

Replace `https://your-chatbot-domain.com` in the embed code with your actual deployment URL.

## Example: Complete HTML Page with Chatbot

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website with Chatbot</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This is my content...</p>

  <!-- Chatbot iframe -->
  <iframe
    src="https://your-chatbot-domain.com/chatbot-embed.html"
    style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999; pointer-events: none;"
    allow="clipboard-read; clipboard-write">
  </iframe>
</body>
</html>
```

## Testing Locally

Before deploying, test the iframe locally:

1. Start the dev server: `npm run dev`
2. Create a test HTML file with the iframe pointing to `http://localhost:5173/chatbot-embed.html`
3. Open the test file in your browser

## Customization

### Change Chatbot Position
The default position is bottom-right. The chatbot is designed to be fixed in that position.

### Cross-Origin Considerations
If your chatbot is hosted on a different domain than your main website, make sure:
- Your server sends proper CORS headers
- The iframe has appropriate `allow` attributes

### Security
The iframe sandbox can be configured for additional security:

```html
<iframe
  src="https://your-chatbot-domain.com/chatbot-embed.html"
  sandbox="allow-scripts allow-same-origin allow-forms"
  ...>
</iframe>
```

## WordPress Integration

For WordPress sites, add this code to your theme's footer or use a custom HTML widget:

```html
<iframe
  src="https://your-chatbot-domain.com/chatbot-embed.html"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999; pointer-events: none;"
  allow="clipboard-read; clipboard-write">
</iframe>
```

## Shopify Integration

Add to your theme.liquid file before the closing `</body>` tag:

```html
<iframe
  src="https://your-chatbot-domain.com/chatbot-embed.html"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999; pointer-events: none;"
  allow="clipboard-read; clipboard-write">
</iframe>
```

## Troubleshooting

**Chatbot not showing:**
- Check browser console for errors
- Verify the iframe src URL is correct
- Check if Content Security Policy is blocking the iframe

**Clicks not working:**
- Ensure `pointer-events: none` is set on iframe
- Check z-index is high enough
- Verify no other elements are overlaying the chatbot

**CORS errors:**
- Host the chatbot on the same domain
- Or configure CORS headers on your server

## Support

For issues or questions, check the project documentation or create an issue in the repository.
