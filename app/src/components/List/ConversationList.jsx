import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'framework7-react';
import ConversationItem from './ConversationItem';

const ConversationList = ({ conversations, closeConversation, leaveChannel }) => (
  <List style={{ margin: '32px 0 0 0' }}>
    {
      conversations.map((conversation) => (
        <ConversationItem
          conversation={conversation}
          closeConversation={closeConversation}
          leaveChannel={leaveChannel}
        />
      ))
    }
  </List>
);

ConversationList.defaultProps = {
  conversations: [],
};

ConversationList.propTypes = {
  conversations: PropTypes.array,
  closeConversation: PropTypes.func.isRequired,
  leaveChannel: PropTypes.func.isRequired,
};

export default ConversationList;
