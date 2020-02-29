import React from 'react';
import { Icon, Block, Button } from 'framework7-react';

import styled from 'styled-components';
import { Play } from '@/components/Icon';
import Emoji from './Emoji';

const ControlContainer = styled.div`
  width: 100%;
  height: calc(100vh - var(--gb-message-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .button {
    margin: 0px;
    background-color: transparent;
  }
`;

const BottomControls = styled(Block)`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ForwardControls = styled(Block)`
  width: 225px;
  display: flex;
  justify-content: space-evenly;
  margin: 0px auto 32px;
  padding: 0px;
 
  .button {
    width: 40px;
    height: 40px;
    padding: 0px;
  }

  i {
    font-size: 32px;
  }
`;

const RewindControl = styled(Block)`
  width: 200px;
  display: flex;
  justify-content: space-evenly;
  margin: 0px auto;
`;


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
      <Button>2x</Button>
      <Emoji />
    </BottomControls>
  </ControlContainer>
);
export default Player;
