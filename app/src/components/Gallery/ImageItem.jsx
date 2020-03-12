import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'framework7-react';

import { get } from '@shared/lib';
import ImageItemInfo from './ImageItemInfo';
import ImageRecordingItem from './ImageRecordingItem';
import ImageItemPlaying from './ImageItemPlaying';
import { StyledSlide } from './style';

const ImageItem = ({
  onClick, id, thumbnail, state, sender, pullover,
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
      <ImageItemInfo pullover={pullover} recording={slideProps.recording} />
      <StyledSlide {...slideProps}>
        {<ImageItemPlaying state={state} thumbnail={renderThumbnail} sender={sender} />}
        {slideProps.recording && <ImageRecordingItem thumbnail={renderThumbnail} />}
      </StyledSlide>
    </SwiperSlide>
  );
};

ImageItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  sender: PropTypes.object.isRequired,
  pullover: PropTypes.array.isRequired,
};

export default React.memo(ImageItem);
