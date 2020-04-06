import React from 'react';
import { View } from 'framework7-react';
import { useOrgUserListener, useOrgListener } from '@/lib/socket';
import { useBadgeUpdate } from './lib/hooks';

const Main = () => {
  useOrgUserListener();
  useBadgeUpdate();
  useOrgListener();

  return (
    <View main url="/conversations" />
  );
};

export default Main;
