import { ListInput, Link } from 'framework7-react';
import styled from 'styled-components';


export const StyledForm = styled.div`
  .list ul:before {
    display: none;
  }

  ul::after {
    display: none;
  }
`;

export const StyledListInput = styled(ListInput)` 
  &::after {
    display: none;
  }

  input {
    border-bottom: 1px solid white;
  }

  .item-content, .item-inner {
    padding: 0;
  }
`;

export const StyledLink = styled(Link)`
  text-align: right;
  width: 300px;
  display: block;
  margin: 0px auto;
  color: #fff;
`;

export const AuthWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
