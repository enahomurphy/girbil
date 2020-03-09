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

const NewMessage = () => {
  const { params } = useVideoData(null, 'video');
  const [video] = useVideo(params);
  const [videoRecorder] = useState(new Video('video'));
  const [addMessage, { data }] = useMutation(mutation.ADD_MESSAGE);
  const [getUploadURLS, { data: urls }] = useLazyQuery(uploadQuery.UPLOAD_URLS);
  const [updateMessage] = useMutation(mutation.UPDATE_MESSAGE);
  const [{ matches }, send] = useMachine(RecordMachine, {
    context: {
      addMessage,
      updateMessage,
      getUploadURLS,
    },
  });

  const startRecord = () => {
    const conversationId = get(f7.views.main.router.currentRoute, 'params.conversationId', '');

    if (matches('record.idle')) {
      addMessage({ variables: { conversationId } });
      videoRecorder.startRecord();
      send('GET_URLS');
      send('START');
    }

    if (matches('record.start')) {
      const uploadURL = get(urls, 'getUploadURL.postVideoURL', '');
      const messageId = get(data, 'addMessage.id');
      const file = videoRecorder.file(messageId);
      videoRecorder.stopRecord();
      send('STOP');
      send('PROCESS', { file, url: uploadURL });
    }
  };

  useEffect(() => {
    videoRecorder.initVideo();
  }, [videoRecorder]);

  const goBack = () => {
    f7.view.current.router.back();
  };

  return (
    <Page overflow="hidden">
      <NewMessageWrapper>
        <Header goBack={goBack} back />
        <RecorderButton onClick={startRecord} recording={matches('record.start')} />
        <VideoComponent video={video} />
      </NewMessageWrapper>
    </Page>
  );
};

export default NewMessage;
