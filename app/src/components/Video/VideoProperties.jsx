import React from 'react';
import { Icon, Button } from 'framework7-react';
import PropTypes from 'prop-types';

import { Previous, Next } from '@/components/Icon';
import Emoji from '@/components/Emoji';
import Speed from './Speed';
import Buffer from './Buffer';
import { Reactions } from '@/components/Video';
import {
  ControlContainer, ForwardControls, RewindControl, BottomControls,
} from './style';

const VideoProperties = ({
  playing, play, pause, played, duration, seek, playBack, handleReact, show, next, prev, reactions,
}) => (
  <ControlContainer>
    {
      (!playing || show) && (
        (
          <>
            <ForwardControls>
              <Button onClick={prev}>
                <Previous />
              </Button>
              <Button onClick={playing ? pause : play}>
                <Icon
                  f7={playing ? 'pause_fill' : 'play_fill'}
                  color="#ffffff"
                  style={{
                    fontSize: '70px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.33)',
                    color: '#ffffff',
                  }}
                />
              </Button>
              <Button onClick={next}>
                <Next />
              </Button>
            </ForwardControls>
            <RewindControl>
              <div role="presentation" onClick={() => seek(-10)}>
                <Icon onClick={alert} f7="gobackward_10" />
              </div>
              <div role="presentation" onClick={() => seek(10)}>
                <Icon f7="goforward_10" />
              </div>
            </RewindControl>
          </>
        )
      )
    }
    <BottomControls>
      <Speed onClick={({ value }) => playBack(value)} />
      <Reactions reactions={reactions} handleReact={handleReact}/>
      <Emoji vertical reaction onClick={handleReact} />
    </BottomControls>
    {
      Boolean(duration && duration !== Infinity) && (
        <Buffer
          duration={duration}
          played={played}
          seek={seek}
          playing={playing}
        />
      )
    }
  </ControlContainer>
);

VideoProperties.defaultProps = {
  reactions: [],
};

VideoProperties.propTypes = {
  playing: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  played: PropTypes.number.isRequired,
  playBack: PropTypes.func.isRequired,
  handleReact: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  reactions: PropTypes.array,
};

export default VideoProperties;