import React from 'react';
import PropTypes from 'prop-types';

import {
  Title, Block, Text, Button,
} from '@/components/Style';
import styled from 'styled-components';


const ErrorStateWrapper = styled.div` 
  width: 100%;
  height: 100%;
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 10;
  background-color: var(--f7-page-bg-color);
`;

const ErrorState = ({ handleRetry, handleCancel }) => (
  <ErrorStateWrapper>
    <Title size="30px" line="38px" weight="bold" align="center">
      We are sorry, your Girbil could not be sent
    </Title>
    <Text
      margin="9px 0 0 0"
      color="#C9C9C9"
      size="18px"
      height="24px"
    >
      Try sending it again or record a new message.
    </Text>
    <Block
      margin="100px 0 0 0"
      type="flex"
      direction="column"
      align="center"
    >
      <Button
        onClick={handleRetry}
        size="18px"
        inverse
      >
        Try Again
      </Button>
      <Button
        onClick={handleCancel}
        weight="normal"
        color="var(--gb-medium-grey)"
        borderColor="none"
      >
        Cancel
      </Button>
    </Block>
  </ErrorStateWrapper>
);

ErrorState.propTypes = {
  handleRetry: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ErrorState;
