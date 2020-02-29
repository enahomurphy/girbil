import React from 'react';
import PropTypes from 'prop-types';

import { Reaction } from '@/components/Icon';
import IconOptions from '../IconOptions';
import emojis from './emojis';

const Emoji = ({ onClick, reaction, vertical }) => (
  <IconOptions
    onClick={onClick}
    reaction={reaction}
    vertical={vertical}
    options={emojis}
    icon={<Reaction />}
    tooltip
  />
);

Emoji.defaultProps = {
  vertical: false,
  reaction: false,
};

Emoji.propTypes = {
  onClick: PropTypes.func.isRequired,
  reaction: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default Emoji;
