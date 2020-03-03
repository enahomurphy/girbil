import React, { useState, Fragment } from 'react';

import Alert from '@/components/icons/Alert';
import {
  Title, Text, Input, InputWrapper, Flex,
} from '@/components/styles';
import Layout from '@/components/layout';

const Second = () => {
  const [state] = useState('error');

  return (
    <Layout title="Great, now create your organization">
      <Text color="#666666" margin="32px 0 0 0">
        STEP 2 OF 3
      </Text>
      <Title size="18px" color="#ffffff" margin="5px 0 16px 0">
        Create organization URL
      </Title>
      <Text margin="0 0 24px 0">
        We’ll use this URL to customize invitations to join your organiztion.
        We also have other exciting plans in the works for it.
      </Text>
      <InputWrapper>
        <Input align="right" placeholder="Company" />
        <Text
          transform="lowercase"
          weight="bold"
          color="#ffffff"
          margin="0 0 0 8px"
        >
          .girbil.com
        </Text>
      </InputWrapper>
      <Flex margin="16px 0 90px 0">
        {
          state === null && (
            <Text size="12px">
              Your workspace URL can only contain lowercase letters,
              numbers and dashes (and must start with a letter or number).
            </Text>
          )
        }
        {
          state === 'error' && (
            <Fragment>
              <Alert />
              <Text size="12px" margin="0 0 0 8px">
                That URL is
                <span className="danger"> unavailable</span>
                . Please choose another.
              </Text>
            </Fragment>
          )
        }
      </Flex>
      <button className="primary" type="button">Continue</button>
    </Layout>
  );
};

export default Second;
