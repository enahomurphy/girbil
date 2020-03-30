import React, { useEffect, useState } from 'react';
import { useVideo } from 'react-use';
import { useMachine } from '@xstate/react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { f7 } from 'framework7-react';
import PropTypes from 'prop-types';

import emitter from '@/lib/emitter';
import RecordMachine from '@/states/record';
import { Video as VideoComponent, useVideoData, Header } from '@/components/Video';
import { mutation, query } from '@shared/graphql/conversations';
import { query as uploadQuery } from '@shared/graphql/upload';
import { RecorderButton } from '@/components/Recorder';
import { Video, blobToFile } from '@/lib/media';
import { useConversationMeta } from '@/lib/hooks';
import { Page } from '@/components/Style';
import { get } from '@shared/lib';
import { getParam } from '@/lib';
import { NewMessageWrapper } from './style';

const NewMessage = ({ isThread, conversationId }) => {
  const { data: conversationData } = useQuery(
    query.CONVERSATION,
    { variables: { conversationId } },
  );
  const conversationMeta = useConversationMeta(get(conversationData, 'conversation', {}));

  const { params } = useVideoData(null, 'video');
  const id = isThread ? 'thread-video' : 'video';
  const [video] = useVideo({ ...params, id, muted: true });
  const [videoRecorder] = useState(new Video(id));

  const [saveMessage] = mutation.useSaveMessage();
  const [addMessage, { data }] = useMutation(mutation.ADD_MESSAGE);
  const [updateState] = mutation.useMessageState();

  const [{ matches }, send] = useMachine(RecordMachine, {
    context: {
      addMessage,
      saveMessage,
    },
  });

  const [getUploadURLS, { data: urls }] = useLazyQuery(uploadQuery.UPLOAD_URLS, {
    onCompleted: ({ getUploadURL }) => {
      send('UPLOAD_URL', { urls: getUploadURL });
    },
  });

  useEffect(() => {
    videoRecorder.initVideo();
    return () => {
      videoRecorder.stop();
      updateState({ state: 'done' });
    };
  }, [videoRecorder, updateState]);

  useEffect(() => {
    emitter.emitEvent('play_unread');
  }, []);

  const stopRecord = async () => {
    const messageId = get(data, 'addMessage.id');
    const threadId = getParam('threadId');

    if (matches('record.start')) {
      updateState({ messageId, state: 'complete' });
    }

    const file = await videoRecorder.stopRecordAndGetFile(messageId);
    send('STOP');
    send('PROCESS', {
      file, urls, messageId, conversationId, parentId: threadId,
    });
  };

  const startRecord = async () => {
    const threadId = getParam('threadId');
    if (matches('record.idle') && matches('processing.idle')) {
      videoRecorder.startRecord();
      send('START');
      addMessage({
        variables: { conversationId, messageId: threadId },
        update: (_, { data: messageData }) => {
          send('GET_URLS', {
            message: messageData.addMessage,
            conversationId,
            getUploadURLS,
          });
        },
      });
    }

    if (matches('record.start')) {
      stopRecord();
    }
  };

  videoRecorder.onThumbnailStop = async (blob) => {
    const messageId = get(data, 'addMessage.id');
    const thumbnail = blobToFile(blob, messageId);
    send('UPLOAD_THUMBNAIL', { thumbnail, urls });
  };

  videoRecorder.onDurationEnd = () => {
    stopRecord();
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
    <Page overflow="hidden">
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
        <RecorderButton onClick={startRecord} recording={matches('record.start')} />
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
