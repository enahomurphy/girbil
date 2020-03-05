import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { f7 } from 'framework7-react';

import Gallery from '@/components/Gallery';
import { mutation, query } from '@shared/graphql/conversations';

const Messages = () => {
  const [loadMessages, { data, loading }] = useLazyQuery(query.MESSAGES);
  const [updateMessage] = useMutation(mutation.UPDATE_MESSAGE);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  if (loading) {
    return null;
  }

  const onClick = (messageId) => {
    updateMessage({
      variables: {
        id: messageId,
      },
    });

    f7.views.main.router.navigate(
      `/conversations/:conversationId/${messageId}`,
      {
        animate: 'f7-dive',
        props: {
          messageId,
        },
        ignoreCache: true,
      },
    );
  };

  return (
    <Gallery messages={data ? data.messages : []} onClick={onClick} />
  );
};

export default Messages;
