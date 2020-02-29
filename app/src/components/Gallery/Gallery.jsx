import React, { useState, useEffect } from 'react';
import {
  Swiper,
  Icon,
  f7,
} from 'framework7-react';
import PropTypes from 'prop-types';

import {
  SliderWrapper, SliderNav, Right, SliderNavWrapper,
} from './style';
import ImageItem from './ImageItem';

const Gallery = ({ messages, onClick }) => {
  const [swiper, setSwiper] = useState({});
  useEffect(() => {
    if (messages.length) {
      const slide = f7.swiper.get('.swiper-container');
      setSwiper(slide);
    }
  }, [messages]);

  return Boolean(messages.length) && (
    <SliderWrapper>
      <SliderNavWrapper>
        <SliderNav onClick={() => swiper.slidePrev()}>
          <Icon f7="chevron_right" />
        </SliderNav>
      </SliderNavWrapper>
      <Swiper params={{ lazy: true, slidesPerView: 3, spaceBetween: 0 }}>
        {
          messages.map(({ id, thumbnail }) => (
            <ImageItem
              onClick={onClick}
              key={id}
              id={id}
              thumbnail={thumbnail}
            />
          ))
        }
      </Swiper>
      <SliderNavWrapper right onClick={() => swiper.slideNext()}>
        <Right>
          <Icon f7="chevron_left" />
        </Right>
      </SliderNavWrapper>
    </SliderWrapper>
  );
};

Gallery.propTypes = {
  messages: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Gallery;
