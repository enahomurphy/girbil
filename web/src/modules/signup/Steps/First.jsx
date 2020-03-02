import React from 'react';

import Layout from '../AuthLayout';
import { Title, Text, Input } from '../style';

const First = () => (
  <Layout title="Great, now create your organization">
    <Text color="#666666" margin="32px 0 0 0">
      STEP 1 OF 3
    </Text>
    <Title size="18px" color="#ffffff" margin="5px 0 16px 0">
      Name your organization
    </Title>
    <Text margin="0 0 24px 0">
      Your organization is the fundamental place in Giribil
      to connect and collaborate. You can create teams within
      organizations, so we recommend creating one for your
      entire company, non-profit, etc.
    </Text>
    <Input placeholder="Organization Name (e.g., company name)" />
    <Text size="12px" margin="16px 0 88px 0">
      The name will usually be the name of your company, non-profit, etc.
    </Text>
    <button className="primary" type="button">Continue</button>
  </Layout>
);

export default First;
