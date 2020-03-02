import React from 'react';

import Layout from '@/components/layout';
import { Text, Flex } from '@/components/styles';
import { CopyForm } from './style';

const Share = () => (
  <Layout title="Share an invite link">
    <Text margin="16px 0 0 0">
      Anyone can use this link to join Weave on Girbil,
      so please only share with people you trust.
    </Text>
    <Flex margin="32px 0 244px 0" direction="column" align="flex-start">
      <Text color="#EFEFEF" weight="bold">
        Invite link for Weave
      </Text>
      <CopyForm margin="8px 0 0 0">
        <input value="https://weave.girbil.com/invite/QtMzIxM9..." className="bordered" />
        <button type="button" className="green">copy</button>
      </CopyForm>
    </Flex>

    <button type="submit" className="primary">
      Download Girbil App
    </button>
  </Layout>
);

export default Share;
