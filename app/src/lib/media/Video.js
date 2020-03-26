import { storage, get } from '@shared/lib';

import Recorder from './Recorder';

class Video extends Recorder {
  constructor(videoId, width, height) {
    super(videoId);

    this.videoId = videoId;
    this.stream = new MediaStream();
    this.height = width || window.screen.height - 125;
    this.width = height || window.screen.width;

    this.videoStart = this.videoStart.bind(this);
    this.videoError = this.videoError.bind(this);
    this.initVideo = this.initVideo.bind(this);
    this.stop = this.stop.bind(this);

    this.onVideoStart = () => {};
  }

  initVideo() {
    this.useMedia();
  }

  useMedia() {
    navigator.getUserMedia(
      Video.constraints,
      this.videoStart,
      this.videoError,
    );
  }

  videoStart(stream) {
    this.stream = stream;
    this.video.srcObject = stream;
    this.video.play();
    this.onVideoStart(this.stream);
    super.initRecorder(stream);
  }

  videoError(error) {
    console.info(this.videoId, error);
  }

  stop() {
    this.stream.getTracks().forEach((track) => {
      track.stop();
    });
    this.reset();
  }

  get video() {
    return document.getElementById(this.videoId);
  }

  static get constraints() {
    const device = storage.getItem('gb-device');
    const audioSource = get(device, 'microphone.deviceId', undefined);
    const videoSource = get(device, 'video.deviceId', undefined);

    return {
      audio: { deviceId: audioSource },
      video: { deviceId: videoSource },
    };
  }
}

export default Video;
