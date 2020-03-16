import React, { useEffect, useState } from 'react';
import { f7 } from 'framework7-react';
import { useVideo } from 'react-use';
import { useMachine } from '@xstate/react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

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

const NewMessage = ({ isThread, conversationId }) => {
  const { data: conversationData } = useQuery(
    query.CONVERSATION,
    { variables: { conversationId }, fetchPolicy: 'network-only' },
  );
  const conversationMeta = useConversationMeta(get(conversationData, 'conversation', {}));
  const { params } = useVideoData(null, 'video');

  // @TODO unify video element;
  const id = isThread ? 'thread-video' : 'video';
  const [video] = useVideo({ ...params, id });
  const [videoRecorder] = useState(new Video(id));

  const [saveMessage] = mutation.useSaveMessage();
  const [addMessage, { data }] = useMutation(mutation.ADD_MESSAGE);
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


  const startRecord = () => {
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
      const messageId = get(data, 'addMessage.id');

      const file = videoRecorder.file(messageId);
      videoRecorder.stopRecord();
      send('STOP');
      send('PROCESS', {
        file, urls, messageId, conversationId, parentId: threadId,
      });
    }
  };

  videoRecorder.onRecordStart = async () => {
    const thumbnail = await videoRecorder.thumbnail('');
    send('UPLOAD_THUMBNAIL', { thumbnail, urls });
  };

  useEffect(() => {
    videoRecorder.initVideo();
    return () => {
      videoRecorder.stop();
    };
  }, [videoRecorder, isThread]);

  const goBack = () => {
    f7.views.main.router.back();
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
          goBack={goBack}
          back
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
