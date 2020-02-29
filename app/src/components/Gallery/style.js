import styled from 'styled-components';

export const StyledSlide = styled.div`
  height: var(--gb-message-height);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const SliderWrapper = styled.div`
  width: 100%;
  height: var(--gb-message-height);
  background: red;
  position: relative;
  box-sizing: border-box;
`;

export const SliderNav = styled.div`
  height: 56px;
  position: absolute;
  background: rgba(0, 0, 0, 0.66);
  border-radius: 0 5px 5px 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  cursor: pointer;
  
  &:hover {
    cursor: pointer;
    opacity: .8
  }
`;

export const Right = styled(SliderNav)`
  right: 0;
  transform: rotate(-180deg);
`;

export const SliderNavWrapper = styled.div`
  height: var(--gb-message-height);
  max-width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: absolute;
  width: 16px;
  top: 0;
  right: ${({ right }) => (right ? 0 : 'initial')};
`;

export const RecordingInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: var(--gb-message-width);
  width: 100%;
  height: 20px;
  align-items: center;
  padding: 8px 2px 0 8px;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  height: 35px;
`;

export const RecordingInfo = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: var(--gb-red);
`;
