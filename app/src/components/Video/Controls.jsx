import React from 'react';
import { Icon, Button } from 'framework7-react';

import { Play } from '@/components/Icon';
import Emoji from '@/components/Emoji';
import Speed from './Speed';
import {
  ControlContainer, ForwardControls, RewindControl, BottomControls,
} from './style';

const Player = () => (
  <ControlContainer>
    <ForwardControls>
      <Button>
        <Icon style={{ fontSize: '20px' }} f7="backward_end_fill" />
      </Button>
      <Button>
        <Play />
      </Button>
      <Button>
        <Icon style={{ fontSize: '20px' }} f7="forward_end_fill" />
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
