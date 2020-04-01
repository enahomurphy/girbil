import React from 'react';
import { useCopyToClipboard } from 'react-use';
import { storage } from '@shared/lib';
import { Link } from 'framework7-react';
import AddConversation from '@/components/Icon/AddConversation';
import {
  EmptyConversationContainer, AddContainer, InviteContainer, InviteForm, InviteInput, InviteButton,
} from './style';

const EmptyConversation = () => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const url = `${process.env.WEB_URL}/invite?token=${storage.token}`;

  return (
    <EmptyConversationContainer>
      <AddContainer>
        <Link href="/channels">
          <AddConversation />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '16px' }}>
          <span style={{ fontWeight: '600', fontSize: '18px' }}>Add DM or Channel</span>
          <span style={{ color: '#B5BBC1', fontSize: '16px' }}>Start collaborating</span>
        </div>
      </AddContainer>
      <InviteContainer>
        <span style={{ fontWeight: '600', fontSize: '18 ' }}>
          <span aria-label="fist" role="img">🤜🏻🤛🏻</span>
          Add a few teammates
        </span>
        <span>Girbil is more valuable with friends</span>
        <InviteForm>
          <InviteInput value={url} onChange={() => {}} />
          <InviteButton
            onClick={() => copyToClipboard(url)}
            type="button"
          >
            {state.value ? 'Copied' : 'Copy Link'}
          </InviteButton>
        </InviteForm>
        <span>+ More invite options</span>
      </InviteContainer>
    </EmptyConversationContainer>
  );
};

export default EmptyConversation;
