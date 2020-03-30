import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Device } from 'framework7';
import emitter from '@/lib/emitter';

import {
  App,
  View,
  f7ready,
  f7,
} from 'framework7-react';

import ApolloClient from '@shared/graphql/client';
import { storage, get } from '@shared/lib';
import { SocketContext, socket } from '@/lib/socket';

import Error from './error';
import cordovaApp from './js/cordova-app';
import routes from './js/routes';
import '@/css/theme.css';

const MainApp = () => {
  const [isAuth, setIsAuth] = useState(
    Boolean(storage.payload && get(storage.payload, 'organization')),
  );
  const [socketConnection, setSocket] = useState();

  const [client] = useState(ApolloClient({
    errorHandler: ({ networkError }) => {
      if (networkError) {
        if (networkError.statusCode === 401) {
          emitter.emitEvent('logout');
        }

        if (networkError.statusCode === 500 || !networkError.statusCode) {
          f7.views.main.router.navigate('/error');
        }
      }
    },
  }));

  const f7params = {
    id: 'com.girbil.app',
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
    if (isAuth) {
      setSocket(socket());
    }
  }, [isAuth]);

  useEffect(() => {
    f7ready((readyF7) => {
      if (Device.cordova) {
        cordovaApp.init(readyF7);
      }
    });
  }, []);

  useEffect(() => {
    emitter.onLastListenedEventEmitted('logout', () => {
      f7.views.main.router.navigate('/', {
        reloadAll: true,
        reloadCurrent: true,
      });
      setIsAuth(false);
    });
  },
  []);

  return (
    <Error>
      <ApolloProvider client={client}>
        <SocketContext.Provider value={socketConnection}>
          <App params={f7params} themeDark>
            {
            isAuth ? (
              <View main url="/conversations" />
            ) : (
              <View main url="/" />
            )
          }
          </App>
        </SocketContext.Provider>
      </ApolloProvider>
    </Error>
  );
};

export default hot(MainApp);
