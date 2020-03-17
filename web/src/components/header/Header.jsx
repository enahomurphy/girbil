import React from 'react';
import { useLocation } from 'react-router-dom';
import { storage, get } from '@shared/lib';

import { HeaderContainer, Logo } from './style';

const Header = () => {
  const loc = useLocation();

  const isSettings = loc.pathname.includes('/settings');
  const title = isSettings
    ? get(storage.payload, 'organization.name', null)
    : 'Girbil';

  return (
    <HeaderContainer>
      <Logo>
        {title}
      </Logo>
    </HeaderContainer>
  );
};


export default Header;
