/* eslint-disable react/jsx-filename-extension */
import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactPlayer from 'react-player';

const useVideo = ({
  width,
  height,
  url,
  play = true,
  onPlay = () => {},
  onPause = () => {},
}) => {
  const ref = useRef();
  const [videoURL, setVideoURL] = useState(url);
  const [playing, setPlaying] = useState(true);
  const [played, setPlayed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  const [pip, setPip] = useState(false);
  const [light, setLight] = useState(false);
  const [controls] = useState(false);

  const handleProgress = (state) => {
    setPlayed(state.playedSeconds);
  };

  const playerControls = {
    loop: setLoop,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    seek: (value) => ref.current.seekTo(value),
    playbackRate: setPlaybackRate,
    pip: () => setPip(!pip),
    stop: () => {
      setPlaying(false);
      setVideoURL(null);
    },
    light: setLight,
    volume: setVolume,
    mute: () => setMuted(!muted),
  };

  const props = {
    ref,
    className: 'react-player',
    width: width || window.screen.availWidth,
    height: height || window.screen.availHeight,
    url: videoURL,
    pip,
    playing,
    controls,
    light,
    loop,
    playbackRate,
    volume,
    muted,
    onPlay: () => {
      setPlaying(true);
      onPlay(true);
    },
    onEnablePIP: () => setPip(true),
    onDisablePIP: () => setPip(false),
    onPause: () => {
      setPlaying(false);
      onPause(false);
    },
    onEnded: () => {
      setPlaying(loop);
      onPause(false);
    },
    onProgress: handleProgress,
  };

  const video = <ReactPlayer {...props} />;

  useEffect(() => {
    setVideoURL(url);
    setPlaying(play);
  }, [url, play]);

  const state = {
    playing: Boolean(playing),
    duration: ref.current ? ref.current.getDuration() : 0,
    playbackRate,
    muted,
    volume,
    played,
  };

  return [video, state, playerControls, ref];
};

export default useVideo;
