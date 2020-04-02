import styled from 'styled-components';
import { Block, Button, Range as f7Range } from 'framework7-react';

export const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  max-height: calc(100vh - var(--gb-message-height));
  video {
    object-fit: cover;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
`;

export const BackIcon = styled(Button)`
  background: ${({ isBack }) => (isBack ? 'var(--gb-accent)' : 'transparent')};
  border: ${({ isBack }) => (isBack ? '2px solid #FFFFFF' : 'none')};
  box-sizing: border-box;
  border-radius: 24px;
  width: 32px;
  height: 32px;
  margin: ${({ margin }) => margin || 'initial'};
  position: absolute;
  left: 16px;
  top: 0pc;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--gb-back-z-index);
  padding: 0px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);

  &:hover,
  .aurora.device-desktop .button:not(.active-state):not(.no-hover):hover {
    background: var(--gb-accent);
    background-color: var(--gb-accent);
    border: 2px solid #ffffff;
  }

  i {
    font-size: 18px;
    color: #ffffff;
  }

  svg {
    width: 16px;
    height: 16px;
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
  -webkit-app-region: drag;

  h1 {
    font: bold 24px/30px Source Sans Pro;
    margin: 0 0 5px 0;
  }

  p {
    font: normal 14px/20px Lato;
    margin: 0;
  }

  h1, p, svg, i {
    text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  }
`;

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
  bottom: 43px;
  width: 100%;
`;

export const ForwardControls = styled(Block)`
  width: 250px;
  margin: 0px auto 32px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button {
    width: fit-content;
    height: 68px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const RewindControl = styled(Block)`
  width: 150px;
  display: flex;
  justify-content: space-between;
  margin: 0px auto;

  .icon {
    font-size: 27px;
    cursor: pointer;
  }
`;

export const Range = styled(f7Range)`
  .range-bar {
    height: 5px;
    z-index: 2;
    background-color: rgba(199, 199, 199, 0.3);
  }

  .range-knob {
    margin-top: 1px;
    display: none;
  }

  &:hover {
    .range-knob {
      margin-top: 1px;
      display: block;
    }
  }
`;

export const BufferWrapper = styled(Block)`
  width: 100%;
  position: absolute;
  bottom: 0px;
`;
