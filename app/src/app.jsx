import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Device } from 'framework7';
import IO from 'socket.io-client';
import emitter from '@/lib/emitter';

import {
  App,
  View,
  f7ready,
  f7,
} from 'framework7-react';

import ApolloClient from '@shared/graphql/client';
import { storage, get } from '@shared/lib';

import '@/css/theme.css';

import cordovaApp from './js/cordova-app';
import routes from './js/routes';

const MainApp = () => {
  const [isAuth, setIsAuth] = useState(
    Boolean(storage.payload && get(storage.payload, 'organization')),
  );

  const [client] = useState(ApolloClient({
    errorHandler: ({ networkError }) => {
      if (networkError) {
        if (networkError.statusCode === 401) {
          setIsAuth(false);
        }
      }
    },
  }));

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
    emitter.onEventEmitted('logout', () => {
      f7.views.main.router.navigate('/', {
        reloadAll: true,
        reloadCurrent: true,
      });
      setIsAuth(false);
    });
  },
  []);

  return (
    <ApolloProvider client={client}>
      <App params={f7params} themeDark>
        {
          isAuth ? (
            <View main url="/conversations" />
          ) : (
            <View main url="/" />
          )
        }
      </App>
    </ApolloProvider>
  );
};

export default hot(MainApp);
