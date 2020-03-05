import React from 'react';
import PropTypes from 'prop-types';

import { VideoWrapper } from './style';

export const useVideoData = (message, id) => {
  const { height, width } = window.screen;
  const params = { height: height - 120, width };

  if (message) {
    params.src = message.url;
    params.id = id;
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
