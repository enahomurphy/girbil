import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Page } from 'framework7-react';
import PropTypes from 'prop-types';
import { useLocalStorage } from 'react-use';

import { useVideo, useConversationMeta } from '@/lib/hooks';
import { query, mutation } from '@shared/graphql/conversations';
import { query as userQuery, mutation as userMutation } from '@shared/graphql/user';
import {
  Video, Header, useVideoData, VideoProperties,
} from '@/components/Video';
import { get } from '@shared/lib';
import emitter from '@/lib/emitter';
import { useGoBack } from './hooks/message';
import { usePlayerPlayPauseEvents } from './hooks/messages';

const Message = ({
  isThread, conversationId, messageId,
}) => {
  const [reactToMessage] = mutation.useAddReaction();
  const [updateState] = mutation.useMessageState();

  const [getMessage, { data }] = useLazyQuery(query.GET_MESSAGE, {
    onCompleted({ message }) {
      updateState({ messageId: message.id, state: 'playing' });
    },
  });

  const message = get(data, 'message', {});
  const PLAYBACK_KEY = 'gb-playbackrate';

  const [playbackRate, setPlaybackrate] = useLocalStorage(PLAYBACK_KEY, 1);

  const { params } = useVideoData(message, 'video');
  const [video, state, controls] = useVideo({
    url: params.src,
    play: params.play,
    width: params.width,
    height: params.height,
    onPlay: () => emitter.emitEvent('play_message', { message, state: 'playing' }),
    onPause: () => {
      emitter.emitEvent('play_message', { message, state: 'pause' });
    },
    onEnd: () => {
      emitter.emitEvent('next_message', { id: message.id, action: 'next' });
      if (!message.hasRead) {
        emitter.emitEvent('read_message', { message });
      }
    },
  });

  const handlePlayback = async (value) => {
    setPlaybackrate(value);
  };

  usePlayerPlayPauseEvents(messageId, controls);

  useEffect(() => {
    controls.playbackRate(playbackRate);
  }, [controls, playbackRate]);

  const { data: conversationData } = useQuery(
    query.CONVERSATION,
    { variables: { conversationId } },
  );

  const [showControls, setShowControls] = useState(false);

  const goBack = useGoBack({ message, isThread });
  const {
    name = '',
    isPrivate = false,
    isChannel,
    typeId,
    members = 0,
  } = useConversationMeta(get(conversationData, 'conversation', {}));

  useEffect(() => {
    getMessage({ variables: { messageId } });

    return () => {
      updateState({ state: 'done' });
    };
  }, [getMessage, messageId, updateState]);

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
    <Page overflow="hidden">
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
        <VideoProperties
          show={showControls}
          play={controls.play}
          pause={controls.pause}
          seek={controls.seek}
          playing={state.playing}
          duration={state.duration || 0}
          played={state.played}
          playBack={handlePlayback}
          playbackRate={playbackRate}
          handleReact={handleReact}
          reactions={message.reactions}
          next={handleNextMessage('next')}
          prev={handleNextMessage('prev')}
        />
        <Video video={video} id="video" />
      </div>
    </Page>
  );
};

Message.defaultProps = {
  isThread: false,
};

Message.propTypes = {
  isThread: PropTypes.oneOfType([() => undefined, PropTypes.bool]),
  conversationId: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
};

export default Message;
