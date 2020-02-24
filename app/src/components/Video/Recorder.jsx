import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useVideo } from 'react-use';
import { Block, Icon, Button } from 'framework7-react';

import Gallery from './Gallery';

const VideoWrapper = styled.div`
  /* width: 100%; */
  /* height: 70%; */
`;

const BackIcon = styled.div`
  background: #F14741;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 24px;
  width: 32px;
  height: 32px;
  position: absolute;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 18px;
  }
`;

const StyledBlock = styled(Block)`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0px;
  margin: 0px 20px;
`;

const Header = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  text-align: center;
  margin-top: 25px;

  h1 {
    font: bold 24px/30px PT sans;
    margin: 0 0 5px 0;
  }

  p {
    font: normal 14px/20px Lato;
    margin: 0;
  }
`;

const RecorderBlock = styled(Block)`
  display : flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0px;
  margin: 0px;
  padding: 0px;

  a {
    display: flex;
    width: 64px;
    height: 64px;
    background-color: red;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    i {
      color: #ffffff;
    }
  }
`;

const Recorder = ({ id }) => {
  const [video] = useVideo({ id });
  const [recoding, setRecoding] = useState(false);
  return (
    <VideoWrapper>
      {video}
      <Header>
        <StyledBlock>
          <BackIcon>
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
          !recoding ? <Button onClick={() => setRecoding(true)} /> : (
            <Button onClick={() => setRecoding(false)}>
              <Icon f7="pause" />
            </Button>
          )
        }
        <Gallery />
      </RecorderBlock>
    </VideoWrapper>
  );
};

Recorder.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Recorder;
