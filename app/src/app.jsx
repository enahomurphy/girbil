import { ApolloProvider } from '@apollo/client';
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Device } from 'framework7';
import IO from 'socket.io-client';

import {
  App,
  View,
  f7ready,
  f7,
} from 'framework7-react';

import ApolloClient from '@shared/graphql/client';
import cordovaApp from './js/cordova-app';
import routes from './js/routes';

import '@/css/theme.css';

const client = ApolloClient({
  errorHandler: ({ networkError }) => {
    if (networkError) {
      if (networkError.statusCode === 401) {
        f7.view.main.router.navigate('/');
        window.location.href = '/';
      }
    }
  },
});

const MainApp = () => {
  const f7params = {
    id: 'io.app.girbil',
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
    f7ready((readyF7) => {
      if (Device.cordova) {
        cordovaApp.init(readyF7);
      }
    });
  }, []);

  useEffect(() => {
    IO(process.env.API_URL, { forceNew: false });
  },
  []);

  return (
    <ApolloProvider client={client}>
      <App params={f7params} themeDark>
        <View main url="/conversations" />
      </App>
    </ApolloProvider>
  );
};

export default hot(MainApp);
