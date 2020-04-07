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
            return f7.views.main.router.back(backURL, {
              force: true,
              reloadAll: true,
            });
          }

          const noPrevious = f7.view.main.history.length === 1;

          if (noPrevious) {
            return f7.views.main.router.back('/conversations', {
              force: true,
              reloadAll: true,
            });
          }

          return f7.views.main.router.back();
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
