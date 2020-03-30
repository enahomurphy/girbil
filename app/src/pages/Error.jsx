/* eslint-disable global-require */
import React from 'react';
import { Page } from 'framework7-react';
import {
  Title, Text, Block, Button,
} from '@/components/Style';

const Error = () => (
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
    <Block type="flex" justify="center" margin="0 0 40px 0">
      <img
        alt="error page"
        src="https://girbil.s3-us-west-2.amazonaws.com/app/assets/images/error.png"
      />
    </Block>
    <Title align="center" size="30px">Somethings not right.</Title>
    <Text size="18px" margin="24px 0 117px 0" align="center">
      Sorry, we are having some technical issues (as you can see). Try to refresh the app.
    </Text>

    <Block type="flex" direction="column" align="center">
      <Button
        onClick={() => window.location.reload()}
        size="18px"
        inverse
      >
        Try again
      </Button>
    </Block>
  </Page>
);

export default Error;
