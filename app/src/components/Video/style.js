import styled from 'styled-components';
import { Block, Button } from 'framework7-react';

export const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  max-height: calc(100vh - var(--gb-message-height));
  video {
    object-fit: cover;
  }
`;

export const BackIcon = styled(Button)`
  background: #337AF1;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 24px;
  width: 32px;
  height: 32px;
  position: absolute;
  left: 16px;
  top: 0pc;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--gb-back-z-index);

  i {
    font-size: 18px;
    color: #ffffff;
  }
`;

export const StyledBlock = styled(Block)`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0px;
  margin: 0px 20px;
`;

export const StyledHeader = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  text-align: center;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  h1 {
    font: bold 24px/30px PT sans;
    margin: 0 0 5px 0;
  }

  p {
    font: normal 14px/20px Lato;
    margin: 0;
  }
`;

// export const RecorderBlock = styled(Block)`
//   display : flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   position: absolute;
//   bottom: 0px;
//   margin: 0px;
//   padding: 0px;

//   a {
//     display: flex;
//     width: 64px;
//     height: 64px;
//     background-color: #6C63FF;
//     border-radius: 100%;
//     justify-content: center;
//     align-items: center;
//     margin-bottom: 50px;

//     i {
//       color: #ffffff;
//     }
//   }
// `;

export const ControlContainer = styled.div`
  width: 100%;
  height: calc(100vh - var(--gb-message-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .button {
    margin: 0px;
  }
`;

export const BottomControls = styled(Block)`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const ForwardControls = styled(Block)`
  width: 225px;
  display: flex;
  justify-content: space-evenly;
  margin: 0px auto 32px;
  padding: 0px;
 
  .button {
    width: 40px;
    height: 40px;
    padding: 0px;
  }

  i {
    font-size: 32px;
  }
`;

export const RewindControl = styled(Block)`
  width: 200px;
  display: flex;
  justify-content: space-evenly;
  margin: 0px auto;
`;
