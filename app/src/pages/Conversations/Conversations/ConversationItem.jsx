import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@/components/List/ConversationItem';
import { useConversationListener } from '@/lib/socket';

const ConversationItem = ({ conversation, closeConversation, leaveChannel }) => {
  useConversationListener(conversation.id);

  return (
    <ListItem
      conversation={conversation}
      closeConversation={closeConversation}
      leaveChannel={leaveChannel}
    />
  );
};

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
  closeConversation: PropTypes.func.isRequired,
  leaveChannel: PropTypes.func.isRequired,
};

export default ConversationItem;
