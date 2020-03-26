import React from 'react';
import Emoji from '@/components/Emoji';
import { storage, get } from '@shared/lib';

export const getPullOverLinks = ({
  conversationId,
  message: { id, hasRead, sender },
  markMessage,
  deleteMessage,
  handleReact
}) => {
  const options = [
    {
      type: 'emoji',
      Component: () => (
        <Emoji
          reaction={false}
          vertical={false}
          onClick={reaction => handleReact(id, reaction.value)}
        />
      ),
    },
    {
      type: 'thread',
      link: `/conversations/${conversationId}/thread/${id}/`,
      title: 'Start a thread',
      onClick: () => {},
    },
    {
      type: 'watch',
      title: `Mark as ${hasRead ? 'unwatched' : 'watched'}`,
      onClick: markMessage,
    },
  ];

  if (get(storage, 'payload.id') === sender.id) {
    options.push({
      type: 'delete video',
      title: 'delete video',
      onClick: () => deleteMessage(id),
    });
  }

  return options;
};

export default {};
