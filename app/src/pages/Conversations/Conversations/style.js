import { ListItem, Page as f7Page } from 'framework7-react';

import { Title, Block, Button } from '@/components/Style';
import styled from 'styled-components';

export const StyledUser = styled(Block)`
  margin-left: 7px;
`;

export const Img = styled.img`
  width: 64px;
  height: 80px;
  border-radius: 6px;
`;

export const StyledListItem = styled(ListItem)`
  list-style-type: none;
  margin-bottom: 16px;
  width: 100%;

  li {
    width: 100%;
  }

  .item-content {
    padding: 0px;
  }

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


export const Page = styled(f7Page)`
`;

export const Logo = styled.div`
  padding: 0;
  background: transparent;
  width: fit-content;
  justify-content: flex-start;
  margin-left: 7px;
  display: flex;
  align-items: center;
`;

export const UserOrgDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
