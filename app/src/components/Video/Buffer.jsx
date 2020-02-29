import React from 'react';
import PropTypes from 'prop-types';

import { BufferWrapper, Range } from './style';

const Buffer = ({ duration }) => (
  <BufferWrapper>
    <Range
      min={0}
      max={duration}
      step={1}
      value={10}
    />
  </BufferWrapper>
);

Buffer.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default Buffer;
