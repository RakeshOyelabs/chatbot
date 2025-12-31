(function() {
  'use strict';

  window.ChatbotWidget = {
    init: function(config) {
      config = config || {};
      const position = config.position || 'bottom-right';
      const chatbotUrl = config.url || 'http://localhost:5173/chatbot-embed.html';

      const iframe = document.createElement('iframe');
      iframe.id = 'chatbot-widget-iframe';
      iframe.src = chatbotUrl;
      iframe.style.cssText = `
        position: fixed;
        border: none;
        z-index: 9999;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background: transparent;
      `;

      iframe.setAttribute('allow', 'clipboard-read; clipboard-write');

      document.body.appendChild(iframe);

      return {
        remove: function() {
          const el = document.getElementById('chatbot-widget-iframe');
          if (el) el.remove();
        }
      };
    }
  };

  if (window.ChatbotWidget.autoInit !== false) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        window.ChatbotWidget.init();
      });
    } else {
      window.ChatbotWidget.init();
    }
  }
})();
