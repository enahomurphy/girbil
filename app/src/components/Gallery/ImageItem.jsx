import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'framework7-react';

import ImageItemInfo from './ImageItemInfo';
import ImageRecordingItem from './ImageRecordingItem';
import ImageItemPlaying from './ImageItemPlaying';
import { StyledSlide } from './style';

const ImageItem = ({
  onClick, id, thumbnail, state, sender,
}) => {
  const slideProps = {
    recording: state === 'recording',
    'data-background': thumbnail,
    className: 'swiper-slide swiper-lazy',
    onClick: () => onClick(id),
  };

  if (state === 'recording') {
    delete slideProps['data-background'];
  }

  return (
    <SwiperSlide key={id}>
      <ImageItemInfo recording={slideProps.recording} />
      <StyledSlide {...slideProps}>
        { slideProps.recording && <ImageRecordingItem thumbnail={thumbnail} /> }
        { state === 'playing' && <ImageItemPlaying sender={sender} /> }
        { !slideProps.recording && <div className="swiper-lazy-preloader" /> }
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
};

export default React.memo(ImageItem);
