import React from 'react';
import { Block } from 'framework7-react';

import { Title, Text } from '@/components/Style';

const EmptyMessage = () => (
  <Block padding="20 32 32 aut0">
    <Title>This is the start of your Thread</Title>
    <Text color="#ffffff">
      Just tap the red record button to start collaborating and connecting
      <span aria-label="Cat" role="img">🐭</span>
    </Text>
  </Block>
);

export default EmptyMessage;
