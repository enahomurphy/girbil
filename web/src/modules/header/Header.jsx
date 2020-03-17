import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useLazyQuery } from '@apollo/client';
import { storage, get } from '@shared/lib';
import { query } from '@shared/graphql/organizations';
import { HeaderContainer, Logo } from './style';

const Header = () => {
  const [getOrg, { data }] = useLazyQuery(query.GET_ORGANIZATION, { fectchPolicy: 'cache' });

  const loc = useLocation();

  useEffect(() => {
    getOrg({
      variables: {
        organizationId: get(storage, 'payload.organization.id', ''),
      },
    });
  }, [getOrg]);

  const isSettings = loc.pathname.includes('/settings');
  const title = isSettings
    ? get(data, 'organization.name', null)
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
