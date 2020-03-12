import styled from 'styled-components';
import { List } from 'framework7-react';

export const StyledSlide = styled.div`
  min-height: var(--gb-message-height);
  max-height: var(--gb-message-height);
  height: var(--gb-message-height);
  min-width: var(--gb-max-width);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .wiper-lazy-preloader {
    min-height: var(--gb-message-height);
    max-height: var(--gb-message-height);
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
  }
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
  outline: none;
  
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

  .swiper-button-disabled {
    background-color: red;
    display: none;
  }
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
  z-index:4000;
`;

export const ImageItemOption = styled(List)` 
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #222222;

  .item-content {
    padding: 0;
  }

  &.list .item-inner {
    padding: 0px;

    .item-title {
      font-size: 12px;
    }

    &::after {
      background: none;
    }
  }

  & ul li {
    padding: 5px 16px;
    cursor: pointer;

    &:hover {
      background: var(--gb-accent);
    }
  }

  & ul li:first-child {
    padding: 0px;

    &:hover {
      background: none;
    }
  }
`;

export const RecordingItem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--gb-medium-dark-gray);

  .slider-thumbnail__context {
    display: flex;
    align-items:center;
    margin-top: 6px;
  }
`;

export const SliderThumbnail = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
`;

export const PlayingItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
