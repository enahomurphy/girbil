import { ListItem, Page as f7Page } from 'framework7-react';

import { Title, Block } from '@/components/Style';
import styled from 'styled-components';

export const StyledUser = styled(Block)`
  margin-left: 7px;
  cursor: pointer;
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
  cursor: pointer;
`;

export const UserOrgDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyConversationContainer = styled.div`
  display: flex;
  margin: 32px 0 0 0;
  padding: 0 24px 16px;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
`;

export const AddContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InviteContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #333333;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 10px;
  font-size: 12px;
`;

export const InviteForm = styled.div`
  display: flex;
  height: 23px;
  padding: 20px 0 12px;
`;

export const InviteInput = styled.input`
  background: rgba(34, 34, 34, 0.67);
  border-style: hidden;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 160px;
  color: #FFFFFF;
  padding: 0 10px 0;
`;

export const InviteButton = styled.button`
  background: #33AB77;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-style: hidden;
  width: 67px;
  color: #FFFFFF;
`;