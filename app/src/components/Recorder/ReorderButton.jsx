/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';
import { Button } from 'framework7-react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTween } from 'react-use';

const Idle = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ recording }) => (recording ? 'rgba(255, 255, 255, 0.8)' : 'var(--gb-red)')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Recording = styled.div`
  width: 32px;
  height: 32px;
  background: var(--gb-red);
  border-radius: 2px;
`;

const StyledButton = styled(Button)`
  height: 64px;
  width: 64px;
  z-index: 400;
  position: absolute;
  bottom: 0px;
  border-radius: 100%;
  display: block;
  padding: 0px;
`;

const ReorderButtonWrapper = styled.div`
  z-index: 300;
  position: absolute;
  bottom: 0px;
  height: 72px;
  width: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  margin-bottom: 16px;
`;

const Progress = () => {
  const elapsed = useTween('inOutQuad', 31000);
  const value = 100 - (elapsed * 100);

  let color = '#33AB77';

  if (value <= 50) {
    color = '#FAFF00';
  }

  if (value <= 25) {
    color = '#FF4F44';
  }

  return (
    <CircularProgressbar
      counterClockwise
      maxValue={100}
      value={100 - (elapsed * 100)}
      styles={buildStyles({
        pathColor: color,
        backgroundColor: 'transparent',
        pathTransition: 'none',
        trailColor: 'transparent',
      })}
    />
  );
};

const ReorderButton = ({ recording, onClick }) => (
  <ReorderButtonWrapper>
    {
      recording && (
        <Progress />
      )
    }
    <Idle recording={recording}>
      <StyledButton onClick={onClick} />
      {recording && <Recording />}
    </Idle>
  </ReorderButtonWrapper>
);

ReorderButton.propTypes = {
  recording: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ReorderButton;
