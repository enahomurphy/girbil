

import React, { useState, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { query, mutation } from '@shared/graphql/organizations';
import { storage, get } from '@shared/lib';
import { Text } from '@/components/styles';
import Layout from '@/components/layout';
import UserList from './UserList';
import ChangeRole from './ChangeRole';
import RemoveUser from './RemoveUser';
import PageButton from '../../PageButton';
import { Header } from './style';
import { useRoles } from '../../hooks';

const Permissions = () => {
  const [state, setState] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const { data } = useQuery(query.GET_ORGANIZATION_USERS);
  const [updateRole] = useMutation(mutation.UPDATE_USER_ROLE);
  const users = get(data, 'organizationUsers', []);
  const roles = useRoles();
  const { push } = useHistory();

  const states = {
    list: {
      type: 'list',
      title: 'Manage members',
    },
    update: {
      type: 'remover',
      title: `Change ${get(selectedUser, 'user.name')} account type ?`,
    },
    remove: {
      type: 'remover',
      title: `Remove ${get(selectedUser, 'user.name')}?`,
    },
  };

  const isList = state === 'list';

  const handleUserOptions = (selectedState, user) => () => {
    setState(selectedState);
    setSelectedUser(user);
  };

  const handleUpdateRole = () => {
    updateRole({
      variables: {
        userId: selectedUser.user.id,
        role: roles[selectedUser.role],
      },
      refetchQueries: ['organizationUsers'],
      update: () => setState('list'),
    });
  };

  return (
    <Layout
      padding={isList ? '56px 24px 0 24px' : null}
      title={states[state].title}
      buttonText={
        isList ? 'Invite  People' : ''
      }
      buttonAction={() => push('/invite')}
      backAction={isList ? null : () => setState('list')}
    >
      <Fragment>
        { isList && (
        <div>
          <Header margin="32px 0 16px 0">
            <Text width="50%">Name</Text>
            <Text>Account type</Text>
          </Header>
          {
            users.map(({ user, role, ...props }) => (
              <UserList
                id={user.id}
                key={user.id}
                avatar={user.avatar}
                email={user.email}
                name={user.name}
                role={role}
                onDeleteAccount={handleUserOptions('remove', { user, role, ...props })}
                onChangeAccount={handleUserOptions('update', { user, role, ...props })}
              />
            ))
          }
        </div>
        )}
        { state === 'update' && (
        <ChangeRole
          role={selectedUser.role}
          avatar={storage.payload.avatar}
          email="jeffrey.david.whitlock@gmail.com"
          name="John does"
          close={() => setState('list')}
          handleChange={role => setSelectedUser({ ...selectedUser, role })}
          handleUpdateRole={handleUpdateRole}
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
         )
         }
        {
          !isList && (
            <PageButton
              close={() => setState('list')}
              closeText="CANCEL"
              action={handleUpdateRole}
              actionText={state === 'remove' ? 'Remove' : 'Update'}
              danger={state === 'remove'}
            />
          )
        }
      </Fragment>
    </Layout>
  );
};

export default Permissions;
