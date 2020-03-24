import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLeft,
  Link,
  f7,
} from 'framework7-react';

import { Title } from '@/components/Style';
import { Back } from '@/components/Icon';
import { StyledNavbar } from './style';

const Header = ({ title }) => (
  <StyledNavbar>
    <NavLeft>
      <Link onClick={() => f7.view.main.router.back()}>
        <Back />
      </Link>
      <Title
        margin="0 0 0 16px"
        size="24px"
        width="100%"
      >
        {title}
      </Title>
    </NavLeft>
  </StyledNavbar>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
