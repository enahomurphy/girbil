

import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

import { storage } from '@shared/lib';
import { Text, Flex } from '@/components/styles';
import Layout from '@/components/layout';
import UserList from './UserList';
import ChangeRole from './ChangeRole';
import RemoveUser from './RemoveUser';

const Header = styled(Flex)`
  border-bottom: 1px solid #ffffff;
  padding-bottom: 8px;
`;

const Permissions = () => {
  const [state, setState] = useState('list');

  const states = {
    list: {
      type: 'list',
      title: 'Manage members',
    },
    update: {
      type: 'remover',
      title: 'Remove  Alexis Jones? ',
    },
    remove: {
      type: 'remover',
      title: 'Remove  Alexis Jones? ',
    },
  };

  const isList = state === 'list';

  return (
    <Layout
      padding={isList ? '56px 24px 0 24px' : null}
      title={states[state].title}
      buttonText={isList ? 'Invite  People' : ''}
      backAction={isList ? null : () => setState('list')}
    >
      <Fragment>
        { state === 'list' && (
        <div>
          <Header margin="32px 0 0 0">
            <Text width="50%">Name</Text>
            <Text>Account type</Text>
          </Header>
          <UserList
            avatar={storage.payload.avatar}
            email="jeffrey.david.whitlock@gmail.com"
            name="John does"
            onDeleteAccount={() => setState('remove')}
            onChangeAccount={() => setState('update')}
          />
        </div>
        )}
        { state === 'update' && (
        <ChangeRole
          avatar={storage.payload.avatar}
          email="jeffrey.david.whitlock@gmail.com"
          name="John does"
          close={() => setState('list')}
        />
        )}
        {
         state === 'remove' && (
         <RemoveUser
           avatar={storage.payload.avatar}
           email="jeffrey.david.whitlock@gmail.com"
           name="John does"
           close={() => setState('list')}
         />
         )}
      </Fragment>
    </Layout>
  );
};

export default Permissions;
