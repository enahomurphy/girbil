import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Device } from 'framework7';
import {
  App,
  View,
  f7ready,
} from 'framework7-react';
import { ApolloProvider } from '@apollo/react-hooks';

import client from '@shared/graphql/client';
import cordovaApp from './js/cordova-app';
import routes from './js/routes';

import '@/css/theme.css';

const MainApp = () => {
  const f7params = {
    id: 'io.framework7.girbil',
    name: 'girbil',
    theme: 'aurora',
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
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <App params={f7params} themeDark>
        <View main url="/conversations" />
      </App>
    </ApolloProvider>
  );
};

export default hot(MainApp);
