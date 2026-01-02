class NotificationManager {
  constructor() {
    this.permission = 'default';
    this.enabled = false;
  }

  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.permission = 'granted';
      this.enabled = true;
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      this.enabled = permission === 'granted';
      return this.enabled;
    }

    return false;
  }

  showNotification(title, options = {}) {
    if (!this.enabled || Notification.permission !== 'granted') {
      return;
    }

    try {
      const notification = new Notification(title, {
        icon: '/vite.svg',
        badge: '/vite.svg',
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      setTimeout(() => notification.close(), 5000);
    } catch (error) {
      console.warn('Failed to show notification:', error);
    }
  }

  showNewMessage(message) {
    this.showNotification('New Message', {
      body: message.text.substring(0, 100),
      tag: 'chat-message'
    });
  }
}

export default new NotificationManager();
