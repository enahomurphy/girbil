/* eslint-disable global-require */
import React, { useState } from 'react';

import Layout from '@/components/layout';
import { Text } from '@/components/styles';
import { Flex, Title, Button } from '@/components/styles/index';

const Organizations = () => {
  const [accounts] = useState([
    { id: 1, name: 'Weave', domain: 'weave.girbil.com' },
    { id: 1, name: 'Buffer', domain: 'buffer.girbil.com' },
    { id: 1, name: 'InVision', domain: 'invision.girbil.com' },
  ]);

  return (
    <Layout title="Oh no! That didn’t work...">
      <Text margin="16px 0 5px 0">
        You’re account already has access to ...
      </Text>
      {
        accounts.map(({ name, domain }, index) => (
          <Flex
            bordered={index !== (accounts.length - 1)}
            margin="32px 0 0 0"
          >
            <Flex
              direction="column"
              margin="0 0 20px 0"
              width="calc(100% - 80px)"
              align="left"
            >
              <Title>{name}</Title>
              <Text>{domain}</Text>
            </Flex>
            <Button type="submit" className="green">Open</Button>
          </Flex>
        ))
      }
      <Text margin="60px 0 32px 0">
        Or you can create a new organization.
      </Text>
      <button type="submit" className="primary">Create new Organization</button>
    </Layout>
  );
};

export default Organizations;
