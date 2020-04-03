import styled from 'styled-components';
import { Block, Button } from 'framework7-react';

export const VideoWrapper = styled.div``;

export const BackIcon = styled(Button)`
  background: #6C63FF;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 24px;
  width: 32px;
  height: 32px;
  position: absolute;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

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

export const Header = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  text-align: center;
  margin-top: 25px;

  h1 {
    font: bold 24px/30px PT sans;
    margin: 0 0 5px 0;
  }

  p {
    font: normal 14px/20px Source Sans Pro;
    margin: 0;
  }
`;

export const RecorderBlock = styled(Block)`
  display : flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0px;
  margin: 0px;
  padding: 0px;

  a {
    display: flex;
    width: 64px;
    height: 64px;
    background-color: #6C63FF;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    i {
      color: #ffffff;
    }
  }
`;

export const StyledSlide = styled.div`
  width: 100;
  height: 120px;
  background: ${(props) => props.color};
`;

export const SliderWrapper = styled.div`
  width: 100%;
  height: 120px;
`;

export const SliderNav = styled.div`
  width: 32px;
  height: 80px;
  position: absolute;
  background: rgba(0, 0, 0, 0.66);
  border-radius: 0 5px 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  bottom: 20px;
`;

export const Right = styled(SliderNav)`
  right: 0px;
  transform: rotate(-180deg);
`;

export const NewMessageWrapper = styled.div`
  position: relative;
  height: calc(100vh - var(--gb-message-height));
  width: 100%;
  display: flex;
  justify-content: center;
`;
