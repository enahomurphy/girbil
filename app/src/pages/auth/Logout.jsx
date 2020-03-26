/* eslint-disable global-require */
import React from 'react';
import { Page } from 'framework7-react';
import {
  Title, Text, Block, Button,
} from '@/components/Style';
import { openHome } from '@/lib/opener';

const Logout = () => (
  <Page
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      padding: '100px 24px 0 24px',
      '-webkit-app-region': 'drag',
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
        onClick={() => window.close()}
        weight="normal"
        color="#C9C9C9"
        borderColor="none"
      >
        QUIT GIRBIL
      </Button>
    </Block>
  </Page>
);

export default Logout;
