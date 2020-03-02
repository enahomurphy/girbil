import React from 'react';

import Google from '@/components/icons/Google';
import Layout from './AuthLayout';
import {
  Title, Text, DividerContainer, Footer, GoogleButton,
} from './style';

const Main = () => (
  <Layout title="Let’s get started!">
    <Text>
      First, create your user Girbil account.
      This account can be used across mutliple organizations.
    </Text>
    <Text size="18px" color="#ffffff" margin="40px 0 32px 0">
      Use and authentication service
    </Text>
    <GoogleButton className="primary">
      <span>
        <Google />
      </span>
      Continue with Google
    </GoogleButton>
    <DividerContainer>
      <div className="divider" />
      <div className="or">
        <Text size="18px" color="#ffffff">OR</Text>
      </div>
      <div className="divider" />
    </DividerContainer>
    <Text size="18px" color="#ffffff" margin="40px 0 24px 0">
      Continue using your email address
    </Text>
    <Text size="14px" color="var(--gb-web-blue)" margin="0 0 24px 0">
      Coming soon!
    </Text>
    <Footer>
      <Text size="14px" align="center">
        Giribil is made with
        <span role="img" aria-label="love">❤️</span>
        around the world by a remote team.
      </Text>
    </Footer>
  </Layout>
);

export default Main;
