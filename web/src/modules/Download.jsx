import React from 'react';

import Layout from '@/components/layout';
import { Text } from '@/components/styles';

const Download = () => (
  <Layout title="Finally, download and launch the Girbil app">
    <Text margin="16px 0 292px 0">
      Once you download and launch our desktop app,
      you should be taken directly to the organization you just created.
      If you’re not, please re-authenticate with Google.
    </Text>

    <button className="primary" type="button">Download Girbil</button>
  </Layout>
);

export default Download;
