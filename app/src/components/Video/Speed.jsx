import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'framework7-react';

import IconOptions from '../IconOptions';

const speeds = [
  {
    name: '3x',
    value: 3,
  },
  {
    name: '2x',
    value: 2,
  },
  {
    name: '1.5x',
    value: 1,
  },
  {
    name: '1x',
    value: 1,
  },
];

const Speed = ({ onClick, value }) => {
  const selectedSpeed = speeds.find(speed => speed.value === value);
  const [speed, setSpeed] = useState(selectedSpeed);

  const onSpeedClick = (value) => {
    onClick(value);
    setSpeed(value);
  };

  return (
    <IconOptions
      onClick={onSpeedClick}
      reaction
      vertical
      options={speeds}
      icon={<Button>{speed.name}</Button>}
      height="108px"
      font="bold 12px/15px Source Sans Pro"
      tooltip={false}
      isEmoji={false}
    />
  );
};

Speed.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Speed;
