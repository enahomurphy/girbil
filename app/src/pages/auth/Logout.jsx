/* eslint-disable global-require */
import React, { useEffect, useContext } from 'react';
import { Page } from 'framework7-react';
import {
  Title, Text, Block, Button,
} from '@/components/Style';
import { openHome, quitApp } from '@/lib/opener';
import { storage } from '@shared/lib';
import { SocketContext } from '@/lib/socket';

const Logout = () => {
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      socket.disconnect();
    }
    storage.clear();
  }, [socket]);

  return (
    <Page
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '100px 24px 0 24px',
        WebkitAppRegion: 'drag',
      }}
      noToolbar
      noNavbar
      noSwipeback
    >
      <Text margin="0 0 96px 0" align="center">
        <span role="img" aria-label="cat" style={{ fontSize: '96px' }}>🐭</span>
      </Text>
      <Title align="center" size="30px">You’re signed out</Title>
      <Text size="18px" margin="24px 0 117px 0" align="center">
        Sorry, we are having some technical issues
        (as you can see). Try to refresh the app.
      </Text>

      <Block type="flex" direction="column" align="center">
        <Button
          onClick={openHome}
          size="18px"
          inverse
        >
          Sign Back In
        </Button>
        <Button
          onClick={quitApp}
          weight="normal"
          color="#C9C9C9"
          borderColor="none"
        >
          QUIT GIRBIL
        </Button>
      </Block>
    </Page>
  );
};

export default Logout;
