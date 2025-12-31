# Quick Start: Embed Chatbot with iframe

## Step 1: Deploy Your Chatbot

Build the project:
```bash
npm run build
```

Deploy the `dist` folder to any hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Step 2: Get Your Chatbot URL

After deployment, you'll get a URL like:
- `https://your-site.netlify.app`
- `https://your-site.vercel.app`
- Or your custom domain

## Step 3: Embed in Any Website

Add this code to any HTML page:

```html
<!-- Add this before closing </body> tag -->
<iframe
  src="https://YOUR-CHATBOT-URL.com/chatbot-embed.html"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999; pointer-events: none;"
  allow="clipboard-read; clipboard-write">
</iframe>
```

**Replace** `YOUR-CHATBOT-URL.com` with your actual deployment URL.

## Step 4: Test Locally First

To test locally before deploying:

1. Start dev server: `npm run dev`
2. Open `demo-third-party-site.html` in your browser
3. You should see the chatbot working!

## That's It!

The chatbot will now appear on any page where you add the iframe code.

## Examples for Popular Platforms

### WordPress
Add to Appearance > Theme Editor > footer.php before `</body>`

### Shopify
Add to theme.liquid before `</body>`

### HTML Website
Add to any .html file before `</body>`

### React App
```jsx
<iframe
  src="https://YOUR-CHATBOT-URL.com/chatbot-embed.html"
  style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    zIndex: 9999,
    pointerEvents: 'none'
  }}
  allow="clipboard-read; clipboard-write"
/>
```

For more details, see `IFRAME_EMBED_GUIDE.md`
