import { Device } from 'framework7';

export const getRemote = () => window.remote;

export const getApp = () => window.remote.app;

export const triggerDock = (state) => {
  if (Device.electron) {
    if (state) {
      window.remote.app.dock.show();
    } else {
      window.remote.app.dock.hide();
    }
  }
};

export const getStartUpState = () => {
  if (Device.electron) {
    const app = getApp();
    return app.getLoginItemSettings().openAtLogin;
  }

  return false;
};


export const setIconBadge = (value) => {
  if (Device.electron) {
    const app = getApp();
    if (value) {
      app.dock.setBadge(value.toString());
    } else {
      app.dock.setBadge('');
    }
  }
};

export default { triggerDock, getStartUpState, setIconBadge };
