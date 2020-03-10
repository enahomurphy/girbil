import React from 'react';
import { Icon, Button } from 'framework7-react';
import PropTypes from 'prop-types';

import { Previous, Next } from '@/components/Icon';
import Emoji from '@/components/Emoji';
import Speed from './Speed';
import Buffer from './Buffer';
import {
  ControlContainer, ForwardControls, RewindControl, BottomControls,
} from './style';

const Controls = ({
  playing, play, pause, played, duration, seek, playBack,
}) => (
  <ControlContainer>
    {
      !playing && (
        (
          <>
            <ForwardControls>
              <Button>
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
              <Button>
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
      <Emoji vertical reaction onClick={() => {}} />
    </BottomControls>
    {
      duration && duration !== Infinity && (
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


Controls.propTypes = {
  playing: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  played: PropTypes.number.isRequired,
  playBack: PropTypes.func.isRequired,
};

export default Controls;
