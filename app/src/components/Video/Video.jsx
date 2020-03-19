import React from 'react';
import PropTypes from 'prop-types';

import { VideoWrapper } from './style';

export const useVideoData = (message, id) => {
  const params = { height: 676, width: 376 };

  if (message) {
    params.src = message.video;
    params.id = id;
    params.play = message.state === 'playing';
    return {
      params,
      isMessage: true,
      autoPlay: true,
    };
  }

  params.id = id;
  return { params, isMessage: false };
};

const Video = ({ video }) => (
  <VideoWrapper>
    {video}
  </VideoWrapper>
);

Video.propTypes = {
  video: PropTypes.object.isRequired,
};

export default Video;
