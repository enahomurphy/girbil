import { ApolloProvider } from '@apollo/client';
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Device } from 'framework7';
import {
  App,
  View,
  f7ready,
} from 'framework7-react';

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
        {/* <View main url="/users/4cd8a5b3-bce4-49ab-a0c7-cb17874a1914/profile" /> */}
        {/* <View channel url="/channels/d1f9a291-cf2e-4bff-8606-724e8ab7d5c1" /> */}
        <View main url="/conversations" />
      </App>
    </ApolloProvider>
  );
};

export default hot(MainApp);
