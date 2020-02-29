import React from 'react';
import PropTypes from 'prop-types';

import { Title } from '@/components/Style';
import { RecordingInfo, SliderThumbnail, RecordingItem } from './style';

const ImageRecordingItem = ({ thumbnail }) => (
  <RecordingItem>
    <SliderThumbnail img={thumbnail} />
    <div className="slider-thumbnail__context">
      <RecordingInfo />
      <Title
        weight="600"
        size="14px"
        margin="0 0 0 8px"
        width="fit-content"
      >
        Recording
      </Title>
    </div>
  </RecordingItem>
);

ImageRecordingItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
};

export default ImageRecordingItem;
