import React, { useEffect } from 'react';
import { useVideo } from 'react-use';
import { useMachine } from '@xstate/react';
import { useMutation, useQuery } from '@apollo/client';
import { f7 } from 'framework7-react';
import PropTypes from 'prop-types';

import emitter from '@/lib/emitter';
import RecordMachine from '@/states/record';
import { Video as VideoComponent, useVideoData, Header } from '@/components/Video';
import { mutation, query } from '@shared/graphql/conversations';
import { query as uploadQuery } from '@shared/graphql/upload';
import { RecorderButton } from '@/components/Recorder';
import { Video } from '@/lib/media';
import { useConversationMeta } from '@/lib/hooks';
import { Page } from '@/components/Style';
import { get } from '@shared/lib';
import { getParam } from '@/lib';
import { NewMessageWrapper } from './style';
import ErrorState from './ErrorState';

const videoRecorder = new Video('video');

const NewMessage = ({ isThread, conversationId }) => {
  const { data: conversationData } = useQuery(
    query.CONVERSATION,
    { variables: { conversationId } },
  );
  const conversationMeta = useConversationMeta(get(conversationData, 'conversation', {}));
  const { params } = useVideoData(null, 'video');
  const id = isThread ? 'thread-video' : 'video';
  const [video] = useVideo({ ...params, id, muted: true });

  const [saveMessage] = mutation.useSaveMessage();
  const [deleteMessage] = mutation.useDeleteLocalMessage();
  const [addMessage, { data }] = useMutation(mutation.ADD_MESSAGE);
  const [updateState] = mutation.useMessageState();
  const { refetch: getUploadURLS } = useQuery(uploadQuery.UPLOAD_URLS, {
    skip: true,
    fetchPolicy: 'network-only',
  });

  const [{ matches }, send] = useMachine(RecordMachine, {
    context: {
      addMessage,
      saveMessage,
      updateState,
      getUploadURLS,
      deleteMessage,
    },
  });

  useEffect(() => {
    videoRecorder.initializeStream();
    return () => {
      if (videoRecorder.stream) {
        videoRecorder.stopStream();
      }
      updateState({ state: 'done' });
    };
  }, [updateState]);

  useEffect(() => {
    emitter.emitEvent('play_unread');
  }, []);

  const stopRecord = async () => {
    const messageId = get(data, 'addMessage.id');
    if (matches('record.start')) {
      updateState({ messageId, state: 'complete' });
      send('STOP');
    }
  };

  const startRecord = async () => {
    const threadId = getParam('threadId');
    if (matches('record.idle') && matches('processing.idle')) {
      videoRecorder.startRecording();
      send('START');
      addMessage({
        variables: { conversationId, messageId: threadId },
        update: (_, { data: messageData }) => {
          send('ADD_MESSAGE', { message: messageData.addMessage });
        },
      });
    }

    if (matches('record.start')) {
      stopRecord();
      videoRecorder.stopRecording();
    }
  };

  videoRecorder.onStopRecorder = (recordData) => {
    stopRecord();
    send('UPLOAD', recordData);
  };

  const goBack = () => {
    if (isThread) {
      f7.views.main.router.back(
        `/conversations/${conversationId}`,
        { force: true, reloadPrevious: true },
      );
    } else {
      f7.views.main.router.back(
        '/conversations',
        { force: true, reloadPrevious: true },
      );
    }
  };

  const {
    name = '',
    isPrivate = false,
    members = 0,
    isChannel,
    typeId,
  } = conversationMeta;

  return (
    <Page overflowX="hidden">
      <NewMessageWrapper>
        <Header
          name={name}
          isPrivate={isPrivate}
          back
          goBack={goBack}
          showBack={matches('record.idle') && matches('processing.idle')}
          isThread={isThread}
          onClick={() => {}}
          members={members}
          isChannel={isChannel}
          typeId={typeId}
        />
        {
          matches('processing.error') ? (
            <ErrorState
              handleRetry={() => send('RETRY_PROCESSING')}
              handleCancel={() => send('DELETE')}
            />
          ) : (
            <>
              <RecorderButton
                onClick={startRecord}
                recording={
                  matches('record.start') && Boolean(videoRecorder.stream)
                }
              />
            </>
          )
        }
        <VideoComponent video={video} />
      </NewMessageWrapper>
    </Page>
  );
};

NewMessage.defaultProps = {
  isThread: false,
};

NewMessage.propTypes = {
  isThread: PropTypes.oneOfType([() => undefined, PropTypes.object]),
  conversationId: PropTypes.string.isRequired,
};

export default NewMessage;
