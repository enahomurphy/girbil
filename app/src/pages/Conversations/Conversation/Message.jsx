import React from 'react';
import { useQuery } from '@apollo/client';
import { Page, f7 } from 'framework7-react';
import { useVideo } from '@/lib/hooks';
import PropTypes from 'prop-types';

import { query } from '@shared/graphql/conversations';
import {
  Video, Header, useVideoData, Controls,
} from '@/components/Video';

const Message = ({ isThread, messageId }) => {
  const { data } = useQuery(query.MESSAGE);
  const { params } = useVideoData(data.message, 'video');
  const [video, state, controls] = useVideo({ url: params.src });

  const goBack = () => {
    const { conversationId } = f7.views.main.router.currentRoute.params;
    const link = isThread
      ? `/conversations/${conversationId}/${messageId}/thread/`
      : `/conversations/${conversationId}/`;
    f7.view.current.router.navigate(link);
  };

  return (
    <Page>
      <Header goBack={goBack} back={false} isThread={isThread} />
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

Message.propTypes = {
  isThread: PropTypes.oneOfType([() => undefined, PropTypes.object]).isRequired,
  messageId: PropTypes.oneOfType([() => undefined, PropTypes.object]).isRequired,
};

export default Message;
