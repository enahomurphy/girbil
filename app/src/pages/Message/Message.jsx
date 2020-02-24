import React, { useEffect } from 'react';
import { } from 'framework7';
import { Page } from 'framework7-react';
import { Recorder as VideoRecorder } from '@/components/Video';
import { Video } from '@/lib/media';

const Message = () => {
  useEffect(() => {
    const video = new Video('video');
    // TODO handle video recording;
    console.info(video);
  }, []);

  return (
    <Page>
      <VideoRecorder id="video" />
    </Page>
  );
};

export default Message;
