import React from 'react';
import {
  Swiper,
  SwiperSlide,
  Icon,
  f7,
} from 'framework7-react';
import PropTypes from 'prop-types';

import {
  StyledSlide, SliderWrapper, SliderNav, Right,
} from './style';


const Gallery = ({ messages }) => {
  const onClick = (messageId) => () => {
    f7.views.main.router.navigate(
      {
        name: 'messages',
        params: { messageId },
      },
      {
        animate: true,
        transition: 'f7-fade',
      },
    );
  };

  return (
    <SliderWrapper>
      <SliderNav>
        <Icon f7="arrow_left" />
      </SliderNav>
      <Swiper params={{ slidesPerView: 3, spaceBetween: 0 }}>
        {
          messages.map(({ id, color }) => (
            <SwiperSlide key={id}>
              <StyledSlide onClick={onClick(id)} color={color} />
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

Gallery.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Gallery;
