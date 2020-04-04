const { getAppIcon } = require('./utils');

module.exports = {
  browserWindow: {
    icon: getAppIcon(),
    width: 376,
    height: 812,
    resizable: false,
    alwaysOnTop: false,
    fullscreenable: false,
    title: 'Girbil',
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      devTools: true,
      preload: `${__dirname}/preload.js`,
    },
  },
};
