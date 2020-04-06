import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';

import ListItem from '@/components/List/ListItem';

const ConversationItem = ({ conversation, leaveChannel, closeConversation }) => {
  const {
    id, receiver, channel, receiverType, unread,
  } = conversation;
  return (
    <>
      {
       (receiverType === 'user') ? (
         <ListItem
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
           isPrivate={false}
           unreadCount={unread}
           user={{
             id: receiver.id,
             name: receiver.name,
             lastActive: format(receiver.lastActive),
             isActive: receiver.isActive,
             avatar: receiver.avatar,
           }}
         />
       ) : (
         <ListItem
           options={[
             {
               title: 'View Channel',
               getLink: () => `/channels/${channel.id}`,
               clickable: false,
             },
             {
               title: 'Leave Channel',
               clickable: true,
               onClick: leaveChannel(channel.id),
             },
             {
               title: 'Close Channel',
               clickable: true,
               onClick: closeConversation(id),
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
             avatar: channel.avatar,
             isPrivate: true,
             members: channel.members,
           }}
         />
       )
      }
    </>
  );
};

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
  closeConversation: PropTypes.func.isRequired,
  leaveChannel: PropTypes.func.isRequired,
};

export default ConversationItem;
