import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'framework7-react';

import { get } from '@shared/lib';
import { Complete } from '@/components/Icon';

import ImageRecordingItem from './ImageRecordingItem';
import { StyledComplete, StyledSlide } from './style';

const RecordingItem = ({ state, sender }) => (
  <SwiperSlide>
    <StyledSlide>
      {state === 'recording' && (
      <ImageRecordingItem
        thumbnail={get(sender, 'avatar')}
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

RecordingItem.propTypes = {
  state: PropTypes.string.isRequired,
  sender: PropTypes.object.isRequired,
};

export default RecordingItem;
