import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'framework7-react';

import ImageItemInfo from './ImageItemInfo';
import ImageItemPlaying from './ImageItemPlaying';
import { StyledSlide } from './style';

const ImageItem = ({
  onClick, id, thumbnail, state, sender,
  pullover, createdAt, replyCount, onReplyClicked, hasRead,
}) => {
  const slideProps = {
    recording: state === 'recording',
    'data-background': thumbnail,
    className: 'swiper-slide swiper-lazy',
    onClick: () => onClick(id),
  };

  return (
    <SwiperSlide key={id}>
      <ImageItemInfo
        hasRead={hasRead}
        replyCount={replyCount}
        pullover={pullover}
        recording={slideProps.recording}
        messageId={id}
      />
      <StyledSlide {...slideProps}>
        <ImageItemPlaying
          createdAt={createdAt}
          state={state}
          thumbnail={thumbnail}
          sender={sender}
          replyCount={replyCount}
          onReplyClicked={onReplyClicked}
          messageId={id}
        />
      </StyledSlide>
      <div className="swiper-lazy-preloader" />
    </SwiperSlide>
  );
};

ImageItem.defaultProps = {
  replyCount: 0,
  hasRead: false,
};

ImageItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  sender: PropTypes.object.isRequired,
  pullover: PropTypes.array.isRequired,
  replyCount: PropTypes.number,
  hasRead: PropTypes.bool,
  onReplyClicked: PropTypes.func.isRequired,
  createdAt: PropTypes.oneOfType([Date, PropTypes.number, PropTypes.object]).isRequired,
};

export default ImageItem;
