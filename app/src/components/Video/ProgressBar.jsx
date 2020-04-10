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

  const updateDrag = (event) => {
    setDragPosition(event.clientX);
  };

  const removeListeners = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', updateDrag);
    document.removeEventListener('mouseup', removeListeners);
  };

  const addEventListeners = () => {
    removeListeners();
    setIsDragging(true);
    document.addEventListener('mousemove', updateDrag);
    document.addEventListener('mouseup', removeListeners);
  };

  useEffect(() => {
    const position = (played / duration) * 100;
    setProgress(position);
  }, [played, duration]);

  useEffect(() => {
    if (dragPosition !== 0) {
      const position = ((dragPosition / wrapperWidth) * 100) - 3;
      const seekPosition = position / (100 / duration);
      setProgress(position);
      setDragPosition(0);
      setProgress(position);
      seek(seekPosition, { skipToTime: true });
    }
  }, [dragPosition, duration, seek, wrapperWidth]);

  return (
    <ProgressBarWrapper
      draggable="false"
      onMouseUp={removeListeners}
      onMouseDown={addEventListeners}
      onTouchMove={(event) => updateDrag(event.touches[0])}
      isDragging={isDragging}
      onClick={updateDrag}
      ref={wrapperEl}
    >
      <Progress
        draggable="false"
        progress={progress}
        className="progress"
      />
      <ProgressControl
        draggable="false"
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
