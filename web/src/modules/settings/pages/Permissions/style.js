import styled from 'styled-components';
import { Flex } from '@/components/styles';

export const Options = styled(Flex)`
  padding-bottom: 8px;
  width: 176px;
  position: absolute;
  left: -180px;
  top: 3px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  background: #333333;
  padding: 0px;
  box-shadow: 0px 2px 20px var(--gb-dark-grey);
  cursor: pointer;

  .option {
    width: 100%;
    padding: 8px;
    border-radius: 5px;

    &:hover {
      background: var(--gb-accent);
    }

    p {
      font: normal 12px/14px Source Sans Pro;
      text-transform: capitalize;
      cursor: pointer;
      &:hover {
        color: #ffffff;
      }
    }
  }

  .danger {
    p {
      color: var(--gb-red);
    }

    &:hover {
      p {
        color: #ffffff;
      }

      background: var(--gb-red);
    }
  }
`;

export const Header = styled(Flex)`
  border-bottom: 1px solid #ffffff;
  padding-bottom: 8px;
`;
