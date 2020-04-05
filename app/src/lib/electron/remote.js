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
    const remote = getApp();
    return remote.getLoginItemSettings().openAtLogin;
  }

  return false;
};

export default { triggerDock, getStartUpState };
