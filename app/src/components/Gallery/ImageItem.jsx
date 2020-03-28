import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'framework7-react';

import { get } from '@shared/lib';
import { Complete } from '@/components/Icon';
import ImageItemInfo from './ImageItemInfo';
import ImageRecordingItem from './ImageRecordingItem';
import ImageItemPlaying from './ImageItemPlaying';
import { StyledSlide, StyledComplete } from './style';

const ImageItem = ({
  onClick, id, thumbnail, state, sender,
  pullover, createdAt, replyCount, onReplyClicked, hasRead,
}) => {
  let renderThumbnail = thumbnail;

  if (state === 'recording') {
    renderThumbnail = get(sender, 'avatar');
  }

  const slideProps = {
    recording: state === 'recording',
    'data-background': renderThumbnail,
    className: 'swiper-slide swiper-lazy',
    onClick: () => onClick(id),
  };

  if (state === 'recording') {
    delete slideProps['data-background'];
  }

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
        {<ImageItemPlaying
          createdAt={createdAt}
          state={state}
          thumbnail={renderThumbnail}
          sender={sender}
          replyCount={replyCount}
          onReplyClicked={onReplyClicked}
          messageId={id}
        />}
        {state === 'recording' && (
          <ImageRecordingItem
            thumbnail={renderThumbnail}
          />
        )}

        {state === 'complete' && (
          <StyledComplete>
            <Complete />
          </StyledComplete>
        )}
      </StyledSlide>
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
