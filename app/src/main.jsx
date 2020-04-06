/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { View } from 'framework7-react';
import { useOrgUserListener } from '@/lib/socket';
import { useBadgeUpdate } from './lib/hooks';

const Main = () => {
  useOrgUserListener();
  useBadgeUpdate();

  return (
    <View main url="/conversations" />
  );
};

export default Main;
