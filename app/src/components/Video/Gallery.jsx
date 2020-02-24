import React, { useState } from 'react';
import {
  Swiper,
  SwiperSlide,
  Icon,
} from 'framework7-react';
import styled from 'styled-components';

const StyledSlide = styled.div`
  width: 100;
  height: 120px;
  background: ${(props) => props.color};
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 120px;
  background: red;
`;

const SliderNav = styled.div`
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

const Right = styled(SliderNav)`
  right: 0px;
  transform: rotate(-180deg);
`;

const Gallery = () => {
  const [slides] = useState(Array(20).fill(1).map((value, index) => (
    {
      id: value + index,
      url: '',
      thumbnail: '',
      color: ['red', 'blue', 'green', 'orange', 'gray'][Math.floor(Math.random() * 10)],
    }
  )));

  return (
    <SliderWrapper>
      <SliderNav>
        <Icon f7="arrow_left" />
      </SliderNav>
      <Swiper params={{ slidesPerView: 3, spaceBetween: 0 }}>
        {
          slides.map(({ id, color }) => (
            <SwiperSlide key={id}>
              <StyledSlide color={color} />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Right>
        <Icon f7="arrow_left" />
      </Right>
    </SliderWrapper>
  );
};

export default Gallery;
