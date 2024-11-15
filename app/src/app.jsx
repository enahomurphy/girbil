import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Device } from 'framework7';
import { useLocalStorage } from 'react-use';
import {
  App,
  View,
  f7ready,
  f7,
} from 'framework7-react';

import ApolloClient from '@shared/graphql/client';
import { storage, get } from '@shared/lib';
import emitter from '@/lib/emitter';
import { SocketContext, socket } from '@/lib/socket';
import { triggerDock } from '@/lib/electron';

import Main from './main';

import Error from './error';
import cordovaApp from './js/cordova-app';
import routes from './js/routes';
import '@/css/theme.css';

const MainApp = () => {
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

  const [isAuth] = useState(
    Boolean(storage.payload && get(storage.payload, 'organization')),
  );
  const [socketConnection, setSocket] = useState(socket(isAuth));
  const [showDock] = useLocalStorage('gb-dock', true);

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

  useEffect(() => {
    window.onbeforeunload = () => {
      if (socketConnection) {
        socketConnection.disconnect();
      }
    };

    if (isAuth && !socketConnection) {
      setSocket(socket(isAuth));
    }
  }, [isAuth, socketConnection]);

  useEffect(() => {
    f7ready((readyF7) => {
      if (Device.cordova) {
        cordovaApp.init(readyF7);
      }

      triggerDock(showDock);
    });
  }, [showDock]);

  useEffect(() => {
    emitter.onLastListenedEventEmitted('logout', () => {
      f7.views.main.router.navigate('/logout', {
        reloadAll: true,
        reloadCurrent: true,
      });
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
                <Main />
              ) : (
                <View main url="/logout" />
              )
            }
          </App>
        </SocketContext.Provider>
      </ApolloProvider>
    </Error>
  );
};

export default hot(MainApp);
