import { storage, get } from '@shared/lib';

import Recorder from './Recorder';

class Video extends Recorder {
  constructor(videoId, duration = 30000) {
    super(duration);

    this.videoId = videoId;
    this.stream = new MediaStream();
    this.height = window.screen.height - 125;
    this.width = window.screen.width;

    this.startStream = this.startStream.bind(this);
    this.stopStream = this.stopStream.bind(this);
    this.initializeStream = this.initializeStream.bind(this);
    this.streamError = this.streamError.bind(this);
    this.useMedia = this.useMedia.bind(this);

    this.onVideoStart = () => {};
  }

  initializeStream() {
    this.useMedia();
  }

  useMedia() {
    navigator.getUserMedia(
      Video.constraints,
      this.startStream,
      this.streamError,
    );
  }

  startStream(stream) {
    this.stream = stream;
    this.video.srcObject = stream;
    this.video.play();
    this.onVideoStart(this.stream);
  }

  streamError(error) {
    console.info(this.videoId, error);
  }

  stopStream() {
    this.stream.getTracks().forEach((track) => {
      track.stop();
    });
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

  static async getMediaDevices() {
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();

    const result = {
      microphone: [],
      speaker: [],
      video: [],
    };

    deviceInfos.forEach((deviceInfo) => {
      if (deviceInfo.kind === 'audioinput') {
        result.microphone.push(deviceInfo);
      } else if (deviceInfo.kind === 'audiooutput') {
        result.speaker.push(deviceInfo);
      } else if (deviceInfo.kind === 'videoinput') {
        result.video.push(deviceInfo);
      }
    });

    return result;
  }
}

export default Video;
