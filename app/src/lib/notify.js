import { getRenderer } from './electron';

const hasOrRequestPermission = async () => {
  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      return true;
    }
  }

  return false;
};

const notify = async (message) => {
  const permission = hasOrRequestPermission();

  if (permission) {
    const notification = new Notification(message, {
      body: 'Now',
    });

    notification.onclick = () => {
      getRenderer().send('show');
    };
  }
};

export default notify;
