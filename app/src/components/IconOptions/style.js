import styled from 'styled-components';
import { Button } from 'framework7-react';

export const OptionsContainer = styled.div`
  width: ${({ vertical }) => (vertical ? '40px' : '200px')};
  height: ${({ vertical, height }) => (vertical ? height : '40px')};
  background-color: #222222;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  position: ${({ reaction }) => (reaction ? 'absolute' : 'none')};
  bottom: ${({ vertical }) => (vertical ? '40px' : '-8px')};
  left: ${({ vertical }) => (vertical ? '-3px' : '-35px')};
  flex-direction: ${({ vertical }) => (vertical ? 'flex-coloum' : 'inherit')};
  justify-content: space-around;

  .button {
    height: 45px;
    margin-bottom: ${({ vertical }) => (vertical ? '5px' : '0')};
    width: 24px;
    height: 36px;
    font-size: 24px;
    padding: 0px;
    border-radius: 0px;
    border-bottom: ${({ vertical, last }) => ((last || !vertical) ? '0' : '1px solid #B5BBC1')};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .last {
    margin-bottom: 0;
    border-bottom: 0;
  }
`;

export const ReactionContainer = styled.div`
  position: relative;
  width: 40px;
  box-sizing: border-box;
  & > a {
    padding: 0px;
  }
`;

export const StyledButton = styled(Button)`
  display: flex;
  height: 35px; 
  border-radius: 100%;
  border: 2px solid #ffff;
  height: 32px;
  width: 32px;

  a {
    color: #ffffff;
    padding: 0;
    display: flex;
    padding: 0;
    font: bold 12px/0px Source Sans Pro;
  }
`;
