/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { useLazyQuery } from '@apollo/client';
import { storage, get } from '@shared/lib';
import { query } from '@shared/graphql/organizations';
import { HeaderContainer, Logo } from './style';

const Header = () => {
  const [getOrg, { data }] = useLazyQuery(query.GET_ORGANIZATION, { fetchPolicy: 'cache' });

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('/settings')) {
      getOrg({
        variables: {
          organizationId: get(storage, 'payload.organization.id', ''),
        },
      });
    }
  }, [getOrg]);

  const isSettings = pathname.includes('/settings');
  const title = isSettings
    ? get(data, 'organization.name', null)
    : 'Girbil';

  return (
    <HeaderContainer>
      <Link to="/organizations">
        <Logo>
          {title}
        </Logo>
      </Link>
    </HeaderContainer>
  );
};


export default Header;
