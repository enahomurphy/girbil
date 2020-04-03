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

const Header = ({ title, backURL }) => (
  <StyledNavbar>
    <NavLeft>
      <Link onClick={
        () => {
          if (backURL) {
            return f7.views.main.router.navigate(backURL, { force: true });
          }

          return f7.view.main.router.back();
        }
      }
      >
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

Header.defaultProps = {
  backURL: '',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  backURL: PropTypes.string,
};

export default Header;
