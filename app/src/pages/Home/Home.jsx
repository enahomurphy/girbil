import React from 'react';
import {
  Page,
  Swiper,
  SwiperSlide,

} from 'framework7-react';

import { Collaborate, Team, Workflow } from '@/components/Illustration';
import {
  StyledSlide, SliderWrapper, SliderTitle, SliderText,
} from './style';

export default () => {
  const slides = [
    {
      title: 'A New Way To collaborate',
      info: {
        first: 'Instant video message ',
        second: 'to your team',
      },
      Icon: Collaborate,
    },
    {
      title: 'Tired of explaining through text?',
      info: {
        first: 'Why not send your team',
        second: 'short videos?',
      },
      Icon: Team,
    },
    {
      title: 'A New Way To collaborate',
      info: {
        first: 'No more communication',
        second: 'mishap with Girbil',
      },
      Icon: Workflow,
    },
  ];

  return (
    <Page name="home">
      <SliderWrapper>
        <Swiper pagination scrollbar>
          {
            slides.map(({ info, Icon, title }) => (
              <SwiperSlide>
                <StyledSlide>
                  <Icon />
                </StyledSlide>
                <SliderTitle>{ title }</SliderTitle>
                <SliderText>
                  {info.first}
                  <br />
                  {info.second}
                </SliderText>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </SliderWrapper>
    </Page>
  );
};
