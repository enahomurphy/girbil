import React, { useEffect } from 'react';
import { useVideo } from 'react-use';

import {
  Video as VideoComponent, useVideoData, Header,
} from '@/components/Video';
import { RecorderButton } from '@/components/Recorder';
import { Video } from '@/lib/media';
import { Page } from '@/components/Style';
import { NewMessageWrapper } from './style';

const NewMessage = () => {
  const { params } = useVideoData(null, 'video');
  const [video] = useVideo(params);

  useEffect(() => {
    const videoObj = new Video('video');
    videoObj.init();
  }, []);

  return (
    <Page overflow="hidden">
      <NewMessageWrapper>
        <Header />
        <RecorderButton recording />
        <VideoComponent video={video} />
      </NewMessageWrapper>
    </Page>
  );
};

NewMessage.propTypes = {

};

export default NewMessage;
