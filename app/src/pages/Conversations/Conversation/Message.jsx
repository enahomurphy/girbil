import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Page, f7 } from 'framework7-react';
import PropTypes from 'prop-types';

import { useVideo, useConversationMeta } from '@/lib/hooks';
import { query, mutation } from '@shared/graphql/conversations';
import {
  Video, Header, useVideoData, Controls,
} from '@/components/Video';
import { get } from '@shared/lib';
import emitter from '@/lib/emitter';

const Message = ({
  isThread, messageId, conversationId,
}) => {
  const [getMessage, { data }] = useLazyQuery(query.GET_MESSAGE);
  const message = get(data, 'message', {});
  const { params } = useVideoData(message, 'video');
  const [video, state, controls] = useVideo({
    url: params.src,
    play: params.play,
    width: params.width,
    height: params.height,
    onPlay: () => emitter.emitEvent('play_message', { message, state: 'playing' }),
    onEnd: () => emitter.emitEvent('pause_message', { message, state: 'pause' }),
  });

  const { data: conversationData } = useQuery(
    query.CONVERSATION,
    { variables: { conversationId } },
  );
  const [markAsRead] = mutation.useMarkMessage('read');
  const [updateState] = mutation.useMessageState();

  const conversationMeta = useConversationMeta(get(conversationData, 'conversation', {}));

  useEffect(() => {
    const handleReadMessage = (args) => {
      const variables = {
        conversationId: args.message.conversationId,
        messageId: args.message.id,
        threadId: args.threadId,
      };

      if (!args.message.hasRead) {
        markAsRead(variables);
      }

      getMessage({ variables });
    };

    emitter.onEventEmitted('read_message', handleReadMessage);
    return () => emitter.removeListener('read_message', handleReadMessage);
  }, [getMessage, markAsRead, message.hasRead]);

  const goBack = () => {
    updateState({
      conversationId,
      messageId: message.id,
      threadId: isThread && messageId,
      state: 'done',
    });

    const link = isThread
      ? `/conversations/${conversationId}/thread/${messageId}/`
      : `/conversations/${conversationId}/`;

    f7.view.current.router.navigate(link);
  };

  const {
    name = '',
    isPrivate = false,
    isChannel,
    typeId,
  } = conversationMeta;

  return (
    <Page>
      <Header
        name={name}
        isPrivate={isPrivate}
        goBack={goBack}
        back={false}
        isThread={isThread}
        onClick={() => {}}
        isChannel={isChannel}
        typeId={typeId}
        members={0}
      />
      <Controls
        play={controls.play}
        pause={controls.pause}
        seek={controls.seek}
        playing={state.playing}
        duration={state.duration || 0}
        played={state.played}
        playBack={controls.playbackRate}
      />
      <Video video={video} id="video" />
    </Page>
  );
};

Message.propTypes = {
  isThread: PropTypes.oneOfType([() => undefined, PropTypes.object]).isRequired,
  messageId: PropTypes.oneOfType([() => undefined, PropTypes.object]).isRequired,
  conversationId: PropTypes.string.isRequired,
};

export default Message;
