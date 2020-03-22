import React, { useEffect } from 'react';
import { useVideo } from 'react-use';
import { Page } from 'framework7-react';

import { Video as VideoComponent } from '@/components/Video';
import { join } from '@/lib/media/WebRTC';


const Vid = () => {
  const [video] = useVideo({
    width: 367, height: 700, id: 'video', muted: true,
  });

  useEffect(() => {
    join('room');
  }, []);

  return (
    <Page>
      <VideoComponent video={video} />
    </Page>
  );
};


export default Vid;
