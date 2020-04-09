// inspired by https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
require('dotenv').config();
const { notarize } = require('electron-notarize');

const config = require('../electron-builder.json');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin' || process.platform !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  if (typeof process.env.APPLEID === 'undefined') {
    console.info('skipping notarization, remember to setup environment variables for APPLEID and APPLEIDPASS if you want to notarize');
    return;
  }

  await notarize({
    appBundleId: config.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};
