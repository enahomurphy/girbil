import React from 'react';
import PropTypes from 'prop-types';

import { Reaction } from '@/components/Icon';
import IconOptions from '../IconOptions';
import emojis from './emojis';

const Emoji2 = ({ onClick, reaction, vertical }) => (
  <IconOptions
    onClick={onClick}
    reaction={reaction}
    vertical={vertical}
    options={emojis}
    icon={<Reaction />}
  />
);

Emoji2.defaultProps = {
  vertical: false,
  reaction: false,
};

Emoji2.propTypes = {
  onClick: PropTypes.func.isRequired,
  reaction: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default Emoji2;
