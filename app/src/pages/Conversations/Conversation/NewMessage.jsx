import React, { useEffect, useState } from 'react';
import { useVideo } from 'react-use';
import { useMachine } from '@xstate/react';
import { useMutation } from '@apollo/react-hooks';

import RecordMachine from '@/states/record';
import {
  Video as VideoComponent, useVideoData, Header,
} from '@/components/Video';
import { mutation } from '@shared/graphql/conversations';
import { RecorderButton } from '@/components/Recorder';
import { Video, Recorder } from '@/lib/media';
import { Page } from '@/components/Style';
import { NewMessageWrapper } from './style';


const NewMessage = () => {
  const { params } = useVideoData(null, 'video');
  const [video] = useVideo(params);
  const [recorder, setRecorder] = useState({});
  const [addMessage] = useMutation(mutation.ADD_MESSAGE);
  const [{ matches }, send] = useMachine(RecordMachine, { context: { addMessage } });

  const startRecord = () => {
    if (matches('record.idle')) {
      addMessage();
      recorder.start();
      send('CREATE');
      send('START');
    }

    if (matches('record.start')) {
      send('STOP');
      recorder.stop();
    }
  };

  useEffect(() => {
    const videoObj = new Video('video');
    videoObj.init();

    videoObj.onStart = (stream) => {
      const recorderObj = new Recorder(stream);
      recorderObj.onStop = () => {
        send('PROCESS', { chunks: recorderObj.chunks });
        recorderObj.chunks = [];
      };

      recorderObj.onError = () => {
      };

      setRecorder(recorderObj);
    };
  }, [send]);

  return (
    <Page overflow="hidden">
      <NewMessageWrapper>
        <Header back />
        <RecorderButton onClick={startRecord} recording={matches('record.start')} />
        <VideoComponent video={video} />
      </NewMessageWrapper>
    </Page>
  );
};

export default NewMessage;
