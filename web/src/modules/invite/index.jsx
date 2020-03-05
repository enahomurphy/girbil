import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { mutation } from '@shared/graphql/auth';
import { storage } from '@shared/lib';

import InvitePage from './Invite';

const Invite = () => {
  const { push } = useHistory();
  const [sendInvites, { loading }] = useMutation(mutation.INVITE);
  const user = storage.payload;

  const handleSendInvites = emails => async () => {
    await sendInvites({
      variables: { emails },
    });
  };

  const skip = () => push('/organizations');

  return (
    <InvitePage
      loading={loading}
      skip={skip}
      handleSendInvites={handleSendInvites}
      organizationName={user.organization.name}
    />
  );
};

export default Invite;
