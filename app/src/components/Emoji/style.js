import styled from 'styled-components';

export const EmojiContainer = styled.div`
  width: ${({ vertical }) => (vertical ? '40px' : '200px')};
  height: ${({ vertical }) => (vertical ? '250px' : '40px')};
  background-color: #222222;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  position: ${({ reaction }) => (reaction ? 'absolute' : 'none')};
  bottom: ${({ vertical }) => (vertical ? '40px' : '-8px')};
  left: ${({ vertical }) => (vertical ? 'initial' : '-35px')};
  flex-direction: ${({ vertical }) => (vertical ? 'flex-coloum' : 'inherit')};
  justify-content: space-around;

  .button {
    height: 45px;
    margin-bottom: ${({ vertical }) => (vertical ? '5px' : '0')};
    width: 24px;
    height: 36px;
    font-size: 24px;
    background-color: transparent;
    padding: 0px;
    border-radius: 0px;
    border-bottom: ${({ last, vertical }) => ((last || !vertical) ? 'none' : '1px solid #ffffff')};
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
