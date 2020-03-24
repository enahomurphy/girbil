import { Device } from 'framework7';

export const openURL = (url) => {
  if (Device.electron) {
    window.shell.openExternal(url);
  } else {
    window.open(url);
  }
};

export default openURL;
