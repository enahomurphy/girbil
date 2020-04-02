import { useVideo } from 'react-use';

const useCustomVideo = ({
  width,
  height,
  url,
  play = true,
  onPlay = () => {},
  onPause = () => {},
  onEnd = () => {},
}) => {
  const [video, state, controls, ref] = useVideo({
    src: url,
    width,
    id: 'player',
    height,
    autoPlay: play,
    preload: 'auto',
    onEnded: onEnd,
  });

  const playerControls = {
    play: ({ triggerCb = true } = {}) => {
      controls.play();
      if (triggerCb) onPlay();
    },
    pause: ({ triggerCb = true } = {}) => {
      controls.pause();
      if (triggerCb) onPause();
    },
    seek: (value, { skipToTime = false } = {}) => {
      controls.seek(skipToTime ? value : state.time + value);
    },
    playbackRate: (playbackRate) => {
      ref.current.playbackRate = playbackRate;
    },
    stop: () => {
      controls.pause();
    },
    toggle: (changeState = '') => {
      switch (changeState) {
        case 'playing':
          controls.play();
          break;
        case 'pause':
          controls.pause();
          break;
        default:
          if (state.paused) {
            controls.play();
          } else {
            controls.pause();
          }
      }
    },
    mute: () => {
      controls.mute();
    },
  };

  const playerState = {
    playing: Boolean(!state.paused),
    duration: state.duration,
    playbackRate: ref.current ? ref.current.playbackRate : 1,
    muted: state.muted,
    volume: state.volume,
    played: state.time,
  };

  return [video, playerState, playerControls, ref];
};

export default useCustomVideo;
