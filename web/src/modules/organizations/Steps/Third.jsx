import React, { useState } from 'react';

import LinkIcon from '@/components/icons/Link';
import {
  Title, Text, Input, Form, Flex,
} from '@/components/styles';
import Layout from '@/components/layout';

const First = () => {
  const [emails] = useState([
    { name: 'email', value: '' },
    { name: 'email', value: '' },
    { name: 'email', value: '' },
  ]);

  return (
    <Layout title="Great, now create your organization">
      <Text color="#666666" margin="32px 0 0 0">
        STEP 1 OF 3
      </Text>
      <Title size="18px" color="#ffffff" margin="5px 0 16px 0">
        Invite people to Weave
      </Title>
      <Text margin="0 0 24px 0">
        Girbil is more valuable with friends
        <span role="img" aria-label="lohappyve"> 🤗</span>
      </Text>
      <Form>
        {
          emails.map(({ value }, index) => (
            <Input
              align="left"
              transform="capitalize"
              placeholder="email"
              index={index}
              value={value}
            />
          ))
        }
      </Form>
      <Flex margin="0 0 48px 0">
        <LinkIcon />
        <Text margin="0 0 0 8px" color="#fffff">Share invite link</Text>
      </Flex>
      <button className="primary" type="button">Invite</button>
      <button style={{ marginTop: '15px' }} className="transparent" type="button">Skip</button>
    </Layout>
  );
};

export default First;
