const fs = require('fs');
const { join } = require('path');

const getAppIcon = () => {
  let appIcon;

  if (fs.existsSync(join(__dirname, 'resources/app.png'))) {
    appIcon = join(__dirname, 'resources/app.png');
  } else if (fs.existsSync(join(__dirname, '../img/icon.png'))) {
    appIcon = join(__dirname, '../img/icon.png');
  } else {
    appIcon = join(__dirname, '../img/logo.png');
  }

  return appIcon;
};

const getTrayIcon = () => join(__dirname, 'resources/tray.png');

module.exports = {
  getAppIcon,
  getTrayIcon,
};
