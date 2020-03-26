import { ListItem, Page as f7Page } from 'framework7-react';

import { Title, Block } from '@/components/Style';
import styled from 'styled-components';

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
  /* scrollbar-width: thin;
  scrollbar-color: var(--gb-medium-gray);
  
  &:hover {
    overflow-y: scroll;
    -webkit-overflow-y: overlay;
  }

  &::-webkit-scrollbar {
    width: 2px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gb-medium-grey);
    border-radius: 100px;
  }

  &:scrollbar[orient="horizontal"] {
    color: green;
  } */
`;
