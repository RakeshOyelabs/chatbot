import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';
import './index.css';

const initChatWidget = (containerId = 'chatbot-widget-root') => {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ChatWidget />
    </React.StrictMode>
  );
};

if (typeof window !== 'undefined') {
  window.initChatWidget = initChatWidget;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initChatWidget());
  } else {
    initChatWidget();
  }
}

export default initChatWidget;
