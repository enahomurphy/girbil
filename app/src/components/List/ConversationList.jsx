import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'framework7-react';
import ConversationListItem from './ListItem';

const ConversationList = ({ conversations, closeConversation, leaveChannel }) => (
  <List style={{ margin: '32px 0 0 0' }}>
    {
      conversations.map(({
        id, receiver, channel, receiverType, unread,
      }) => (receiverType === 'user' ? (
        <ConversationListItem
          options={[
            {
              title: 'View Profile',
              getLink: () => `/users/${receiver.id}/profile`,
              clickable: false,
            },
            {
              title: 'Close Direct Message',
              clickable: false,
              onClick: closeConversation(id),
            },
          ]}
          getLink={() => `/conversations/${id}/`}
          key={id}
          id={id}
          isChannel={false}
          isActive={false}
          isPrivate={false}
          unreadCount={unread}
          user={{
            id: receiver.id,
            name: receiver.name,
            lastActive: 'Active 17h ago',
            avatar: receiver.avatar,
          }}
        />
      ) : (
        <ConversationListItem
          options={[
            {
              title: 'View Channel',
              getLink: () => `/channels/${channel.id}`,
              clickable: false,
            },
            {
              title: 'Leave Channel',
              clickable: true,
              shouldHide: channel.isOwner,
              onClick: leaveChannel(channel.id),
            },
          ]}
          getLink={() => `/conversations/${id}/`}
          key={id}
          unreadCount={unread}
          isActive={false}
          isChannel
          id={id}
          isPrivate={channel.isPrivate}
          user={{
            id: channel.id,
            name: channel.name,
            lastActive: 'Active 17h ago',
            avatar: channel.avatar,
            isPrivate: true,
            members: channel.members,
          }}
        />
      )))
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
