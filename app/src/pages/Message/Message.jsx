import React, { useEffect, useState } from 'react';
import { Page, f7 } from 'framework7-react';
import { Recorder as VideoRecorder } from '@/components/Video';
import { Video } from '@/lib/media';

const Message = () => {
  const [messages] = useState(Array(20).fill(1).map((value, index) => (
    {
      id: value + index,
      url: `/static/vid${Math.ceil(Math.random() * 3)}.mp4`,
      thumbnail: '',
      color: ['red', 'blue', 'green', 'orange', 'gray'][Math.floor(Math.random() * 4)],
    }
  )));
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const { messageId } = f7.views.main.router.currentRoute.params;
    const foundMessage = messages.find(({ id }) => id === parseInt(messageId, 10));
    if (!foundMessage) {
      const video = new Video('video');
      // TODO handle video recording;
      console.info(video);
    } else {
      setMessage(foundMessage);
    }
  }, [messages]);

  const back = () => {
    f7.views.main.router.back();
  };

  return (
    <Page>
      <VideoRecorder
        back={back}
        message={message}
        id="video"
        messages={messages}
      />
    </Page>
  );
};

export default Message;
