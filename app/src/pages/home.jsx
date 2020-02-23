import React from 'react';
import {
  Page,
  Swiper,
  SwiperSlide,
} from 'framework7-react';

export default () => (
  <Page name="home">
    <Swiper pagination navigation scrollbar>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  </Page>
);
