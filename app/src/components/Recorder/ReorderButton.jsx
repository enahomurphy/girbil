/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'framework7-react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@/components/Loader';

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

const Progress = ({ duration }) => {
  const [color, setColor] = useState('#33AB77');

  const handleProgress = (value) => {
    if (value <= 50) {
      setColor('#FAFF00');
    }

    if (value <= 25) {
      setColor('#FF4F44');
    }
  };

  return (
    <CircularProgress
      duration={duration}
      onProgress={handleProgress}
      pathColor={color}
    />
  );
};

Progress.propTypes = {
  duration: PropTypes.number.isRequired,
};

const RecorderButton = ({ recording, duration, onClick }) => (
  <ReorderButtonWrapper>
    {
      recording && (
        <Progress duration={duration} />
      )
    }
    <Idle recording={recording}>
      <StyledButton onClick={onClick} />
      {recording && <Recording />}
    </Idle>
  </ReorderButtonWrapper>
);


RecorderButton.defaultProps = {
  duration: 30000,
};

RecorderButton.propTypes = {
  duration: PropTypes.number,
  recording: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecorderButton;
