
import React from 'react';
import { Page } from 'framework7-react';
import { useQuery } from '@apollo/react-hooks';
import { useVideo } from 'react-use';

import { query } from '@/lib/graphql/conversations';
import {
  Video, Header, useVideoData, Controls,
} from '@/components/Video';

const Message = () => {
  const { data } = useQuery(query.MESSAGE);
  const { params } = useVideoData(data.message, 'video');
  const [video] = useVideo(params);


  return (
    <Page>
      <Header onClick={() => {}} />
      <Controls />
      <Video video={video} id="video" />
    </Page>
  );
};

Message.propTypes = {

};

export default Message;
