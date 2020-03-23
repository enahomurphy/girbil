/* eslint-disable global-require */
import React from 'react';

import { Title, Text, Block } from '@/components/Style';

const EmptyMessage = () => (
  <Block type="flex" align="center" direction="column" padding="20px 32px 0 32px">
    <Title>Record a Profile GIF</Title>
    <Text margin="20px 0 0 0" align="center" color="#ffffff">
      You have up to 3 seconds to make yourself a legend among your teammates!
      <span aria-label="Cat" role="img">🐭</span>
    </Text>
  </Block>
);

export default EmptyMessage;
