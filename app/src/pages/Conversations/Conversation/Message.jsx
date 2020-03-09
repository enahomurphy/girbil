import React from 'react';
import { Page, f7 } from 'framework7-react';
import { useQuery } from '@apollo/react-hooks';
import { useVideo } from 'react-use';

import { query } from '@shared/graphql/conversations';
import {
  Video, Header, useVideoData, Controls,
} from '@/components/Video';

const Message = () => {
  const { data } = useQuery(query.MESSAGE);
  const { params } = useVideoData(data.message, 'video');
  const [video] = useVideo(params);

  const goBack = () => {
    const {conversationId } = f7.views.main.router.currentRoute.params;
    f7.view.current.router.navigate(`/conversations/${conversationId}/`)
  }

  return (
    <Page>
      <Header goBack={goBack}  back={false} onClick={() => {}} />
      <Controls />
      <Video video={video} id="video" />
    </Page>
  );
};

export default Message;
