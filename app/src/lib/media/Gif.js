/* eslint-disable no-undef */
import Video from './Video';

class Gif {
  constructor(videoId, duration = 3000) {
    this.videoId = videoId;
    this.stream = new MediaStream();
    this.playing = false;
    this.file = null;
    this.url = null;
    this.duration = duration;

    this.onStart = () => {};
    this.onStop = () => {};
    this.onError = () => {};
    this.startStream = this.startStream.bind(this);
    this.error = () => this.error.bind(this);
  }

  init() {
    navigator.getUserMedia(
      {
        ...Video.constraints,
        audio: false,
      },
      this.startStream,
      this.error,
    );
  }

  startStream(stream) {
    this.stream = stream;
    this.video.srcObject = stream;
    this.video.play();

    this.gif = new RecordRTC(stream, {
      type: 'gif',
      frameRate: 150,
      quality: 1,
    });
  }

  startRecording() {
    this.playing = true;
    this.gif.startRecording();
    this.onStart();
    this.gif.setRecordingDuration(this.duration).onRecordingStopped((url) => {
      this.playing = false;
      const blob = this.gif.getBlob();
      this.onStop(blob, url);
    });
  }

  async stopRecording() {
    return new Promise((resolve) => {
      this.gif.stopRecording((blob) => {
        this.playing = false;
        this.file = blob;
        this.url = blob;
        resolve(blob);
        this.onStop(this.gif.getBlob(), blob);
      });
    });
  }

  error(error) {
    console.error(this.videoId, error);
  }

  reset() {
    this.stream.getTracks().forEach((track) => {
      track.stop();
    });
    this.file = null;
    this.url = null;
    this.gif.destroy();
  }

  get video() {
    return document.getElementById(this.videoId);
  }

  static blobToFile(blob, name) {
    return new File([blob], name, {
      lastModified: (new Date()).getTime(),
      type: 'image/gif',
    });
  }
}

export default Gif;
