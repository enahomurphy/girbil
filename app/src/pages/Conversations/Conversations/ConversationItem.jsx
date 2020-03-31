import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@/components/List/ListItem';
import { mutation as channelMutations } from '@shared/graphql/channels';
import { mutation } from '@shared/graphql/conversations';
import { useConversationListener } from '@/lib/socket';

const ConversationItem = ({ conversation }) => {
  const {
    id, receiver, channel, receiverType, unread,
  } = conversation;

  const [leaveChannel] = channelMutations.useLeaveChannel();
  const [closeConversation] = mutation.useCloseConversation();

  useConversationListener(id);

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
       )
      }
    </>
  );
};

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default ConversationItem;
