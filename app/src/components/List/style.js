import { ListItem } from 'framework7-react';

import { Title, Block } from '@/components/Style';
import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  margin-top: 24px;

  .navbar-bg::after {
    border: none;
  }
`;

export const StyledUser = styled(Block)`
  padding: 0 16px;
`;

export const Img = styled.img`
  width: 64px;
  height: 80px;
  border-radius: 6px;
`;

export const StyledListItem = styled(ListItem)`
  list-style-type: none;
  width: 100%;

  li {
    width: 100%;
  }

  .item-content {
    display: flex;
    padding: 0px;    
  }

  .item-link .item-inner {
    padding: 0 16px 0 0;
    display: flex;
    justify-content: flex-start;

    &::before {
      display: none;
    }

    &::after {
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

  .item-link {
    &:hover:not(.active-state):not(.no-hover) {
      background-color: inherit !important;
    }
  }
`;

export const StyledUserListItem = styled(StyledListItem)`
  .item-link .item-inner {
    margin-left: 0px;
    justify-content: end;
  }
`;

export const Active = styled.div`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 100px;
  background-color: ${(props) => (props.active ? 'var(--gb-green)' : 'transparent')};
  border: 2px solid ${(props) => (props.active ? 'var(--gb-green);' : '#999999')};
  margin-right: 10px;
`;

Active.defaultProps = {
  width: '16px',
  height: '16px',
};

export const StyledTitle = styled(Title)`
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 9px 0 2px;
  width: initial;
  max-width: 140px;
`;
