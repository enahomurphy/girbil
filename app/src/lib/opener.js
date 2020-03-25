import { Device } from 'framework7';
import { storage } from '@shared/lib';

export const openURL = (url) => {
  if (Device.electron) {
    window.shell.openExternal(url);
  } else {
    window.open(url);
  }
};

export const invitePeopleOpener = () => {
  const url = `http://${process.env.WEB_URL}/invite?token=${storage.token}`;
  openURL(url);
};

export const settingsOpener = () => {
  const url = `http://${process.env.WEB_URL}/invite?token=${storage.token}`;
  openURL(url);
};

export default openURL;
