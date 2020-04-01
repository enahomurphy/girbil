import React from 'react';
import PropTypes from 'prop-types';

import { BufferWrapper, Range } from './style';

const Buffer = ({ duration, played, seek }) => (
  <BufferWrapper>
    <Range
      min={0}
      max={duration}
      value={played}
      step={1}
      onRangeChange={(val) => seek(val, { skipToTime: true })}
    />
  </BufferWrapper>
);

Buffer.propTypes = {
  duration: PropTypes.number.isRequired,
  played: PropTypes.number.isRequired,
  seek: PropTypes.func.isRequired,
};

export default Buffer;
