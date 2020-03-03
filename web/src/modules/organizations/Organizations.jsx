/* eslint-disable global-require */
import React, { Fragment } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import Layout from '@/components/layout';
import get from '@shared/lib/get';
import { query } from '@shared/graphql/organizations';
import {
  Flex, Title, Button, Text,
} from '@/components/styles/index';

const Organizations = () => {
  const client = useApolloClient();
  const data = client.readQuery({ query: query.ORGANIZATIONS });
  const organizations = get(data, 'organizations', []);

  return (
    <Layout loading={false} title="Oh no! That didn’t work...">
      <Fragment>
        <Text margin="16px 0 5px 0">
          You’re account already has access to ...
        </Text>
        {
        organizations.map(({ id, name, domain }, index) => (
          <Flex
            key={id}
            bordered={index !== (organizations.length - 1)}
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
      </Fragment>
    </Layout>
  );
};

export default Organizations;
