import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useMachine } from '@xstate/react';
import { useVideo } from 'react-use';
import { f7 } from 'framework7-react';

import RecordMachine from '@/states/record';
import {
  Video as VideoComponent, useVideoData, Header,
} from '@/components/Video';
import { mutation } from '@shared/graphql/conversations';
import { query as uploadQuery } from '@shared/graphql/upload';
import { RecorderButton } from '@/components/Recorder';
import { Video } from '@/lib/media';
import { Page } from '@/components/Style';
import { get } from '@shared/lib';
import { NewMessageWrapper } from './style';
import { getParam, getParams } from '@/lib';

const NewMessage = () => {
  const { params } = useVideoData(null, 'video');
  const [video] = useVideo(params);
  const [videoRecorder] = useState(new Video('video'));

  const [saveMessage] = mutation.useSaveMessage();
  const [addMessage, { data }] = useMutation(mutation.ADD_MESSAGE);
  const [updateMessage] = useMutation(mutation.UPDATE_MESSAGE);
  const [getUploadURLS, { data: urls }] = useLazyQuery(uploadQuery.UPLOAD_URLS, {
    onCompleted: (data) => {
      send('UPLOAD_URL', { urls: data.getUploadURL })
    }
  });

  const [{ value, matches }, send] = useMachine(RecordMachine, {
    context: {
      addMessage,
      updateMessage,
      getUploadURLS,
      saveMessage,
      urls,
    },
  });

  const startRecord = () => {
    const conversationId = getParam('conversationId');
  
    if (matches('record.idle')) {
      videoRecorder.startRecord();
      send('START');
      addMessage({
        variables: { conversationId },
        update: (_, { data: { addMessage } }) => {
          send('GET_URLS', { message: addMessage, conversationId });
        }
      });
    }

    if (matches('record.start')) {
      const messageId = get(data, 'addMessage.id');

      
      const file = videoRecorder.file(messageId);
      videoRecorder.stopRecord();
      send('STOP');
      send('PROCESS', { file, urls, messageId, conversationId });
    }
  };

  videoRecorder.onRecordStart = async () => {
    const thumbnail = await videoRecorder.thumbnail('');
    send('UPLOAD_THUMBNAIL', { thumbnail, urls });
  }

  useEffect(() => {
    videoRecorder.initVideo();

    return () => {
      videoRecorder.stop()
    };
  }, []);

  const goBack = () => {
    f7.view.current.router.back();
  };

  return (
    <Page overflow="hidden">
      <NewMessageWrapper>
        <Header goBack={goBack} back />
        <RecorderButton onClick={startRecord} recording={matches('record.start')} />
        {<VideoComponent video={video} />}
      </NewMessageWrapper>
    </Page>
  );
};

export default NewMessage;
