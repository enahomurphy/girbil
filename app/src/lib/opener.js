import { Device } from 'framework7';
import { storage } from '@shared/lib';
import { getRenderer, getShell } from '@/lib/electron';

export const openURL = (url) => {
  if (Device.electron) {
    getShell().openExternal(url);
  } else {
    window.open(url);
  }
};

export const invitePeopleOpener = () => {
  const url = `${process.env.WEB_URL}/invite?token=${storage.token}`;
  openURL(url);
};

export const settingsOpener = () => {
  const url = `${process.env.WEB_URL}/settings?token=${storage.token}`;
  openURL(url);
};

export const openHome = () => {
  const url = `${process.env.WEB_URL}`;
  openURL(url);
};


export const quitApp = () => {
  if (Device.electron) {
    getRenderer().send('quit');
  } else {
    window.close();
  }
};

export const minimizeApp = () => {
  if (Device.electron) {
    getRenderer().send('minimize');
  } else {
    window.close();
  }
};

export default openURL;
