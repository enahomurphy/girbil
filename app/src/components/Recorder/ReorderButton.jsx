import React from 'react';
import styled from 'styled-components';
import { Button } from 'framework7-react';
import PropTypes from 'prop-types';

const Idle = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 100%;
  z-index: 300;
  position: absolute;
  bottom: 0px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ recording }) => (recording ? 'rgba(255, 255, 255, 0.8)' : 'var(--gb-red)')};
  box-shadow: ${({ recording }) => (recording ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '0px 4px 4px rgba(0, 0, 0, 0.25);')};
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
  padding: 0px;
`;

const ReorderButton = ({ recording, onClick }) => (
  <Idle recording={recording}>
    <StyledButton onClick={onClick} />
    {recording && <Recording />}
  </Idle>
);

ReorderButton.propTypes = {
  recording: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ReorderButton;
