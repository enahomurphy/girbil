import React from 'react';
import PropTypes from 'prop-types';

import { Title, Text, Input } from '@/components/styles';
import Layout from '@/components/layout';

const First = ({ handleChange, next }) => (
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
    <Input name="name" onChange={handleChange} placeholder="Organization Name (e.g., company name)" />
    <Text name="name" size="12px" margin="16px 0 88px 0">
      The name will usually be the name of your company, non-profit, etc.
    </Text>
    <button onClick={next} className="primary" type="button">Continue</button>
  </Layout>
);

First.propTypes = {
  handleChange: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};


export default First;
