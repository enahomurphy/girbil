import styled from 'styled-components';

import { Flex } from '@/components/styles';

export const UserInfo = styled(Flex)`
  margin-bottom: 34px;
  h1 {
    line-height: 18px;
  }
`;

export const NavBar = styled(Flex)`
  height: fit-content;
  padding: 40px 0  066px;
  width: 200px;
  position: absolute;
  left: 66px;
  
`;

export const NavLinks = styled.div`
  width: 100%;
  border-bottom: 1px solid #ffffff;
  margin-bottom: 32px;

  h1 {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: var(--gb-web-grey);
    text-transform: capitalize;
    height: 32px;
    display: flex;
    align-items: center;
    border-radius: 4px;

    &:hover {
      background: #C9C9C9;
      color: #222222;
      padding-left: 5px;
    }
  }

  ul {
    list-style-type: none;
    padding: 0px;
  }

  li {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  .nav {
    margin-bottom: 32px;
  }
`;
