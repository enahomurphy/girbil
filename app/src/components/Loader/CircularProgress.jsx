import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css';

import AnimationProvider from './AnimateProvider';

const CircularProgress = ({ pathColor, duration, onProgress }) => (
  <AnimationProvider
    duration={duration}
    easingFunction="linear"
  >
    {(value) => {
      onProgress(value);
      return (
        <CircularProgressbar
          value={value}
          pathColor
          styles={buildStyles({
            pathColor,
            backgroundColor: 'transparent',
            pathTransition: 'none',
            trailColor: 'transparent',
          })}
        />
      );
    }}
  </AnimationProvider>
);

CircularProgress.defaultProps = {
  pathColor: '#0A84FF',
  onProgress: () => {},
};

CircularProgress.propTypes = {
  pathColor: PropTypes.string,
  duration: PropTypes.string.isRequired,
  onProgress: PropTypes.func,
};

export default CircularProgress;
