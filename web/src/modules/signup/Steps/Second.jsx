import React, { useState } from 'react';

import Google from '@/components/icons/Google';
import Layout from '../AuthLayout';
import {
  Title, Text, DividerContainer, Footer, GoogleButton, Input, InputWrapper,
} from '../style';

const Second = () => {
  const [state, setState] = useState(null);

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
        <Text weight="bold" color="#ffffff" margin="0 0 0 8px">.girbil.com</Text>
      </InputWrapper>
      {
         state === null && (
           <Text size="12px" margin="16px 0 88px 0">
             Your workspace URL can only contain lowercase letters,
             numbers and dashes (and must start with a letter or number).
           </Text>
         )
      }
      {
        state === 'error' && (
          <div>
            <Text size="12px" margin="16px 0 88px 0">
              That URL is
              <span> unavailable</span>
              . Please choose another.
            </Text>
          </div>
        )
      }
      <button className="primary" type="button">Continue</button>
    </Layout>
  );
};

export default Second;
