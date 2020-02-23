import { ListInput } from 'framework7-react';
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
