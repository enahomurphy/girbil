import React from 'react';
import {
  Page,
  Swiper,
  SwiperSlide,
  Button,
  Icon,
  f7,
} from 'framework7-react';

import { Collaborate, Team, Workflow } from '@/components/Illustration';
import {
  StyledSlide, SliderWrapper, SliderTitle, SliderText, AuthButtonsBlock, SocialBlock,
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
      title: 'Supercharge your team workflow',
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
            slides.map(({ info, Icon: SliderIcon, title }) => (
              <SwiperSlide key={title}>
                <StyledSlide>
                  <SliderIcon />
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
      <AuthButtonsBlock>
        <Button
          onClick={() => {
            f7.views.main.router.navigate('/login/', { animate: true });
          }}
          fill
        >
          Sign up
        </Button>
        <Button fill={false}>Login</Button>
      </AuthButtonsBlock>
      <SocialBlock>
        <p>Or sign in with</p>
        <Icon f7="logo_facebook" style={{ marginRight: '22px' }} />
        <Icon f7="logo_google" />
      </SocialBlock>
    </Page>
  );
};
