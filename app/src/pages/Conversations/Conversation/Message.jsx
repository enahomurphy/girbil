import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Page, f7 } from 'framework7-react';
import { useVideo } from '@/lib/hooks';

import { query } from '@shared/graphql/conversations';
import {
  Video, Header, useVideoData, Controls,
} from '@/components/Video';

const Message = () => {
  const { data } = useQuery(query.MESSAGE);
  const { params } = useVideoData(data.message, 'video');
  const [video, state, controls] = useVideo({ url: params.src });

  const goBack = () => {
    const { conversationId } = f7.views.main.router.currentRoute.params;
    f7.view.current.router.navigate(`/conversations/${conversationId}/`);
  };

  return (
    <Page>
      <Header goBack={goBack} back={false} onClick={() => {}} />
      <Controls
        play={controls.play}
        pause={controls.pause}
        seek={controls.seek}
        playing={state.playing}
        duration={state.duration}
        played={state.played}
        playBack={controls.playbackRate}
      />
      <Video video={video} id="video" />
    </Page>
  );
};

export default Message;
