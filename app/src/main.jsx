import React from 'react';
import { View } from 'framework7-react';
import { useOrgListener } from '@/lib/socket';

const Main = () => {
  useOrgListener();

  return (
    <View main url="/conversations" />
  );
};

export default Main;
