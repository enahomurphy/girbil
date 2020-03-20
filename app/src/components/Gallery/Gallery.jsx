import React, { useEffect } from 'react';
import { Swiper, Icon, f7 } from 'framework7-react';
import PropTypes from 'prop-types';

import {
  SliderWrapper, SliderNav, Right, SliderNavWrapper,
} from './style';
import ImageItem from './ImageItem';

const Gallery = ({ messages, onClick }) => {
  useEffect(() => {
    if (messages.length) {
      const slide = f7.swiper.get('.swiper-container');
      if (messages[messages.length - 1].state === 'recording') {
        slide.slideTo(messages.length);
      }
    }
  }, [messages]);

  const onReplyClicked = (id, conversationId) => () => {
    f7.views.main.router.navigate(`/conversations/${conversationId}/thread/${id}/`);
  };

  const params = {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    slidesPerView: 3,
    spaceBetween: 0,
    navigation: {
      nextEl: '.slide-forward',
      prevEl: '.slide-backward',
    },
  };

  return Boolean(messages.length) && (
    <SliderWrapper>
      <SliderNavWrapper>
        <SliderNav className="slide-backward">
          <Icon f7="chevron_left" />
        </SliderNav>
      </SliderNavWrapper>
      <Swiper params={params}>
        {
          messages.map(({
            id, conversationId, thumbnail,
            state, sender, pullover, createdAt, replyCount, hasRead,
          }) => (
            <ImageItem
              onClick={onClick}
              onReplyClicked={onReplyClicked(id, conversationId)}
              key={id}
              id={id}
              thumbnail={thumbnail}
              state={state}
              pullover={pullover}
              sender={sender}
              createdAt={createdAt}
              replyCount={replyCount}
              hasRead={hasRead}
            />
          ))
        }
      </Swiper>
      <SliderNavWrapper right>
        <Right className="slide-forward">
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
