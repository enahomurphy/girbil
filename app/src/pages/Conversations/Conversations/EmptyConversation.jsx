import React from 'react';

import { Link } from 'framework7-react';
import AddConversation from '@/components/Icon/AddConversation';
import { EmptyConversationContainer, AddContainer } from './style';

const EmptyConversation = () => (
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
  </EmptyConversationContainer>
);

export default EmptyConversation;
