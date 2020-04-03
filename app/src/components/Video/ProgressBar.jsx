import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ProgressBarWrapper, Progress, ProgressControl } from './style';

const ProgressBar = ({ duration, played, seek }) => {
  const [progress, setProgress] = useState((played / duration) * 100);
  const [dragPosition, setDragPosition] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const wrapperEl = useRef(null);

  useEffect(() => {
    if (wrapperEl.current) setWrapperWidth(wrapperEl.current.offsetWidth);
  }, [wrapperEl.current]);

  useEffect(() => {
    let position = (played / duration) * 100;
    if (dragPosition !== 0) {
      position = ((dragPosition / wrapperWidth) * 100) - 3;
      const seekPosition = position / (100 / duration);
      seek(seekPosition, { skipToTime: true });
      setDragPosition(0);
    }
    setProgress(position);
  }, [played, dragPosition, duration, seek, wrapperWidth]);

  return (
    <ProgressBarWrapper
      draggable="false"
      onMouseUp={() => setIsDragging(false)}
      onMouseDown={() => setIsDragging(true)}
      onTouchMove={(event) => setDragPosition(event.touches[0].clientX)}
      onMouseMove={(event) => isDragging && setDragPosition(event.clientX)}
      onClick={(event) => setDragPosition(event.clientX)}
      ref={wrapperEl}>
      <Progress
        progress={progress}
        className="progress"
      />
      <ProgressControl
        className="progress-control"
      />
    </ProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  duration: PropTypes.number.isRequired,
  played: PropTypes.number.isRequired,
  seek: PropTypes.func.isRequired,
};

export default ProgressBar;
