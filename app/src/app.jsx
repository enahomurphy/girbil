import React, { useEffect } from 'react';
import { Device } from 'framework7/framework7-lite.esm.bundle.js';
import {
  App,
  View,
  f7ready,
} from 'framework7-react';

import cordovaApp from './js/cordova-app';
import routes from './js/routes';

const MainApp = () => {
  const f7params = {
    id: 'io.framework7.girbil',
    name: 'girbil',
    theme: 'auto',
    routes,
    input: {
      scrollIntoViewOnFocus: Device.cordova && !Device.electron,
      scrollIntoViewCentered: Device.cordova && !Device.electron,
    },
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  useEffect(() => {
    f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  }, []);

  return (
    <App params={f7params} themeDark>
      <View main url="/" />
    </App>
  );
};

export default MainApp;
