import React, { Fragment } from 'react';

import { Text } from '@/components/styles';
import Layout from '@/components/layout';
import PageButton from '../PageButton';

const Billing = () => (
  <Layout title="Plan & Billing ">
    <Fragment>
      <Text margin="32px 0 20px 0">
        Girbil will be 100% free to use for a while!
        But we are a business and need money to survive and keep making this product awesome.
      </Text>
      <Text margin="0 0 20px 0">
        We also need to cover our server costs to store all your videos.
      </Text>

      <Text margin="0 0 20px 0">
        We have so many awesome things we want to do to make your
        remote collaboration more effective, creative, and human.
      </Text>
      <Text>
        So, if you’d like to give feedback on what you think we should
        charge or voluntarily start paying us, please message in the GirbilHQ channel!
      </Text>
      <PageButton
        close={() => {}}
        closeText="CLOSE BROWSER TAB"
        action={() => {}}
        actionText="Open GirbilHQ"
      />
    </Fragment>
  </Layout>
);

export default Billing;
