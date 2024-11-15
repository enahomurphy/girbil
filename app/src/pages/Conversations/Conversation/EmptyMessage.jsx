import React from 'react';
import PropTypes from 'prop-types';

import { Title, Text, Block } from '@/components/Style';

const EmptyMessage = ({ messageType }) => (
  <Block type="flex" align="center" direction="column" padding="20px 32px 0 32px">
    <Title align="center">{`This is the start of your ${messageType}`}</Title>
    <Text margin="20px 0 0 0" align="center" color="#ffffff">
      Just tap the red record button to start collaborating and connecting
      <span aria-label="Cat" role="img">🐭</span>
    </Text>
  </Block>
);

EmptyMessage.defaultProps = {
  messageType: '',
};

EmptyMessage.propTypes = {
  messageType: PropTypes.string,
};

export default EmptyMessage;
