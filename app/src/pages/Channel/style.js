import styled from 'styled-components';

import { Block } from '@/components/Style';

export const Toolbar = styled(Block)`
  height: 65px;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  
  div {
    height: 28px;
    width: 2px;
    background: var(--gb-light-grey);
  }

  a {
    color: var(--gb-medium-grey);
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    font: normal 18px/23px Source Sans Pro;
    text-align: center;
  }

  a.tab-link-active {
    border-bottom: 2px solid var(--gb-accent);
    color: var(--gb-accent);
    font-weight: bold;
  }
`;

export const StyledButton = styled(Block)`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

export const StyledAvatar = styled(Block)`
  width: 64px;
  height: 80px;
  border-radius: 6px;
  background: var(--gb-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
