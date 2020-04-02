import React from 'react';
import { View } from 'framework7-react';
import { useOrgUserListener } from '@/lib/socket';

const Main = () => {
  useOrgUserListener();

  return (
    <View main url="/conversations" />
  );
};

export default Main;
