import React from 'react';
import {
  Swiper,
  SwiperSlide,
  Icon,
} from 'framework7-react';
import PropTypes from 'prop-types';

import {
  StyledSlide, SliderWrapper, SliderNav, Right, SliderNavWrapper,
} from './style';

const Gallery = ({ messages, onClick }) => Boolean(messages.length) && (
  <SliderWrapper>
    <SliderNavWrapper>
      <SliderNav>
        <Icon f7="chevron_right" />
      </SliderNav>
    </SliderNavWrapper>
    <Swiper params={{ slidesPerView: 3, spaceBetween: 0 }}>
      {
        messages.map(({ id, color }) => (
          <SwiperSlide key={id}>
            <StyledSlide onClick={() => onClick(id)} color={color} />
          </SwiperSlide>
        ))
      }
    </Swiper>
    <SliderNavWrapper right>
      <Right>
        <Icon f7="chevron_left" />
      </Right>
    </SliderNavWrapper>
  </SliderWrapper>
);

Gallery.propTypes = {
  messages: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Gallery;
