import React from 'react';
import { Icon, Button } from 'framework7-react';

import { Previous, Next } from '@/components/Icon';
import Emoji from '@/components/Emoji';
import Speed from './Speed';
import {
  ControlContainer, ForwardControls, RewindControl, BottomControls,
} from './style';

const Player = () => (
  <ControlContainer>
    <ForwardControls>
      <Button>
        <Previous />
      </Button>
      <Button>
        <Icon
          f7="play_fill"
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
      <Icon f7="gobackward_10" />
      <Icon f7="goforward_10" />
    </RewindControl>
    <BottomControls>
      <Speed onClick={() => {}} />
      <Emoji vertical reaction onClick={() => {}} />
    </BottomControls>
  </ControlContainer>
);
export default Player;
