import { ListItem } from 'framework7-react';
import { Block } from '@/pages/style';
import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  margin-top: 24px;

  .navbar-bg::after {
    border: none;
  }
`;

export const StyledUser = styled(Block)`
  padding: 0 16px;

  div {
    background-color: transparent;
  }

  .active {
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #33AB77;
    margin-right: 10px
  }
`;

export const Img = styled.img`
  width: 64px;
  height: 80px;
  border-radius: 6px;
`;

export const StyledListItem = styled(ListItem)`
  list-style-type: none;
  margin-bottom: 16px;

  .item-link .item-inner {
    padding: 0 16px 0 0;
    margin-left: 16px;

    &::before {
      display: none;   
    }

    .badge {
      margin-right: 24px;
      width: 32px;
      height: 24px;
    }
    i {
      height: 16px;
    }
  }
`;
