/* eslint-disable global-require */
import React from 'react';

import Layout from '@/components/layout';
import { Text } from '@/components/styles';

const NotFound = () => (
  <Layout title="Oh no! That didn’t work...">
    <Text margin="16px 0 5px 0">
      It seems you tried to do something we can&lsquo;t verify.
      Did you log into a different Girbil account in a different window?
    </Text>
    <Text margin="10px 0 40px 0">
      Can can you log out and try again?
    </Text>
    <img src={require('../assets/img/not-found.jpg')} alt="not found" />
  </Layout>
);

export default NotFound;
