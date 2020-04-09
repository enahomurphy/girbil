// eslint-disable-next-line import/no-extraneous-dependencies
const { Tray } = require('electron');

let tray;
module.exports = (window, icon) => {
  tray = new Tray(icon);
  tray.on('click', () => {
    window.show();
  });

  tray.setToolTip('girbli');
};
