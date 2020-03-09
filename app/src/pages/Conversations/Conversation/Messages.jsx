import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { f7, $f7 } from 'framework7-react';

import Gallery from '@/components/Gallery';
import { mutation, query } from '@shared/graphql/conversations';
import { get } from '@shared/lib';

const Messages = (props) => {
  const [getMessages, { messages, loading }] = query.getConversationMessages();
  const [readMessage] = useMutation(mutation.READ_MESSAGE);

  useEffect(() => {
    const conversationId = get(f7.views.main.router.currentRoute, 'params.conversationId', '');
    getMessages(conversationId);
  }, [])

  const onClick = (messageId) => {
    const conversationId = get(f7.views.main.router.currentRoute, 'params.conversationId', '');
    readMessage({
      variables: {
        id: messageId,
        conversationId: conversationId,
      },
    });

    f7.views.main.router.navigate(
      `/conversations/${conversationId}/${messageId}`,
      {
        animate: 'f7-dive',
        props: {
          messageId,
        },
        ignoreCache: true,
      },
    );
  };

  if (loading) {
    return null;
  }

  return (
    <Gallery messages={messages} onClick={onClick} />
  );
};

export default Messages;
