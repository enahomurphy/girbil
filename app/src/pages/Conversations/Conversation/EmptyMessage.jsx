import React from 'react';
import PropTypes from 'prop-types';

import { Title, Text, Block } from '@/components/Style';

const EmptyMessage = ({ isThread }) => (
  <Block type="flex" align="center" direction="column" padding="20px 32px 0 32px">
    <Title>{`This is the start of your ${isThread ? 'Thread' : 'Conversation'}`}</Title>
    <Text margin="20px 0 0 0" align="center" color="#ffffff">
      Just tap the red record button to start collaborating and connecting
      <span aria-label="Cat" role="img">🐭</span>
    </Text>
  </Block>
);

EmptyMessage.propTypes = {
  isThread: PropTypes.bool.isRequired,
};

export default EmptyMessage;
