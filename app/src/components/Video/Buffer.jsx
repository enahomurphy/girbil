import React from 'react';
import PropTypes from 'prop-types';

import { BufferWrapper, Range } from './style';

const Buffer = ({ duration, played }) => (
  <BufferWrapper>
    <Range
      min={0}
      max={duration}
      value={played}
      step={0.0001}
    />
  </BufferWrapper>
);

Buffer.propTypes = {
  duration: PropTypes.number.isRequired,
  played: PropTypes.number.isRequired,
};

export default Buffer;
