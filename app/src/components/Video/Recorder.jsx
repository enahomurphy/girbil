import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useVideo } from 'react-use';
import { Icon, Button } from 'framework7-react';

import Gallery from './Gallery';
import {
  BackIcon, StyledBlock, VideoWrapper, Header, RecorderBlock,
} from './style';

const useVideoData = (message, id) => {
  const { height, width } = window.screen;
  const params = { height, width };
  if (message) {
    params.src = message.url;
    return {
      params,
      isMessage: true,
      autoPlay: true,
    };
  }

  params.id = id;
  return { params, isMessage: false };
};

const Recorder = ({
  id, back, message, messages,
}) => {
  const { params, isMessage } = useVideoData(message, id);
  const [video,, controls] = useVideo(params);
  const [recoding, setRecoding] = useState(false);

  const play = () => {
    if (isMessage) {
      controls.play();
    } else {
      // record video;
    }
    setRecoding(true);
  };

  const pause = () => {
    if (isMessage) {
      controls.pause();
    } else {
      // handle stop record;
    }
    setRecoding(false);
  };

  return (
    <VideoWrapper>
      {video}
      <Header>
        <StyledBlock>
          <BackIcon onClick={back}>
            <Icon f7="arrow_left" />
          </BackIcon>
          <div>
            <h1>#Dev</h1>
            <p>Active 17h ago</p>
          </div>
        </StyledBlock>
      </Header>
      <RecorderBlock>
        {
          !recoding ? <Button onClick={play} /> : (
            <Button onClick={pause}>
              <Icon f7="pause" />
            </Button>
          )
        }
        <Gallery messages={messages} />
      </RecorderBlock>
    </VideoWrapper>
  );
};

Recorder.defaultProps = {
  message: null,
};

Recorder.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.object,
  back: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Recorder;
