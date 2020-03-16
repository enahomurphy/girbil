import React from 'react';

import Layout from '@/components/layout';
import { Text } from '@/components/styles';

const AccountManagement = () => (
  <Layout title="Account management">
    <Text margin="32px 0 12px 0">
      In the future, you’ll be able to access multiple Giribil organizations.
    </Text>
    <Text margin="0 0 12px 0">
      On this page, you’ll be able to join new organizations and leave existing ones.
    </Text>
    <Text margin="0 0 12px 0">
      You’ll also be able to manage your email authentication and password.
    </Text>
    <Text margin="0 0 12px 0">
      If you have any feedback about what you’d like to see with regards to account management,
      let us know in GirbilHQ!
    </Text>
  </Layout>
);

export default AccountManagement;
