class SoundEffects {
  constructor() {
    this.enabled = true;
  }

  playMessageSent() {
    if (!this.enabled) return;
    this.playTone(800, 100, 'sine');
  }

  playMessageReceived() {
    if (!this.enabled) return;
    this.playTone(600, 100, 'sine');
  }

  playNotification() {
    if (!this.enabled) return;
    this.playTone(1000, 150, 'sine');
  }

  playTone(frequency, duration, type = 'sine') {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export default new SoundEffects();
