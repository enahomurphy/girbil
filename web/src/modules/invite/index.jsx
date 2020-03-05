import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { mutation } from '@shared/graphql/auth';
import { storage } from '@shared/lib';

import InvitePage from './Invite';

const Invite = () => {
  const { push } = useHistory();
  const { addToast } = useToasts();
  const [sendInvites, { loading }] = useMutation(mutation.INVITE);
  const user = storage.payload;

  const handleSendInvites = emails => async () => {
    await sendInvites({
      variables: { emails },
    });

    addToast('Invite sent', { appearance: 'success' });

    push('/download');
  };

  const skip = () => push('/download');

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
