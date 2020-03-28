import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Page } from 'framework7-react';
import PropTypes from 'prop-types';

import { useVideo, useConversationMeta } from '@/lib/hooks';
import { query, mutation } from '@shared/graphql/conversations';
import {
  Video, Header, useVideoData, Controls, Reactions,
} from '@/components/Video';
import { get } from '@shared/lib';
import emitter from '@/lib/emitter';
import { useGoBack, useReadEvent } from './hooks/message';

const Message = ({
  isThread, conversationId, messageId, threadId,
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

  const [reactToMessage] = mutation.useAddReaction();
  const [showControls, setShowControls] = useState(false);

  const goBack = useGoBack({ message, isThread });
  const {
    name = '',
    isPrivate = false,
    isChannel,
    typeId,
    members = 0,
  } = useConversationMeta(get(conversationData, 'conversation', {}));

  useReadEvent();
  useEffect(() => {
    getMessage({
      variables: {
        conversationId,
        messageId,
        threadId,
      },
    });
  }, [conversationId, getMessage, messageId, threadId]);

  const handleReact = ({ value }) => {
    reactToMessage({
      messageId: message.id,
      reaction: value,
    });
  };

  const handleNextMessage = (action) => () => {
    emitter.emitEvent('next_message', { id: message.id, action });
  };

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
        members={members}
      />
      <div
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Controls
          show={showControls}
          play={controls.play}
          pause={controls.pause}
          seek={controls.seek}
          playing={state.playing}
          duration={state.duration || 0}
          played={state.played}
          playBack={controls.playbackRate}
          handleReact={handleReact}
          next={handleNextMessage('next')}
          prev={handleNextMessage('prev')}
        />
        <Reactions reactions={message.reactions} />
        <Video video={video} id="video" />
      </div>
    </Page>
  );
};

Message.propTypes = {
  isThread: PropTypes.oneOfType([() => undefined, PropTypes.object]).isRequired,
  threadId: PropTypes.oneOfType([() => undefined, PropTypes.string]).isRequired,
  conversationId: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
};

export default Message;
