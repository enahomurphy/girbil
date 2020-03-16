/* eslint-disable global-require */
import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import Layout from '@/components/layout';
import { query } from '@shared/graphql/organizations';
import { get } from '@shared/lib';
import {
  Flex, Title, Button, Text,
} from '@/components/styles/index';

const Organizations = () => {
  const { push } = useHistory();
  const { data, loading } = useQuery(query.ORGANIZATIONS, { fetchPolicy: 'network-only' });
  const organizations = get(data, 'organizations', []);

  return (
    <Layout loading={loading} title="Welcome back!">
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
              padding="0 0 16px 0"
            >
              <Flex
                direction="column"
                margin="0"
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
        <button onClick={() => push('/organizations/create')} type="button" className="primary">Create new Organization</button>
      </Fragment>
    </Layout>
  );
};

export default Organizations;
