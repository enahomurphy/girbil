/* eslint-disable no-undef */
import Video from './Video';

class Gif {
  constructor(videoId) {
    this.videoId = videoId;
    this.stream = new MediaStream();
    this.playing = false;
    this.file = null;

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
    });
  }

  startRecording() {
    this.playing = true;
    this.gif.startRecording();
    this.onStart();
  }

  async stopRecording() {
    return new Promise((resolve) => {
      this.gif.stopRecording((blob) => {
        this.playing = false;
        this.file = blob;
        resolve(blob);
        this.onStop(this.gif.getBlob());
      });
    });
  }

  error(error) {
    console.error(this.videoId, error);
  }

  getFile(name) {
    return new File([this.file], name, {
      lastModified: (new Date()).getTime(),
      type: 'video/webm',
    });
  }


  reset() {
    this.stream.getTracks().forEach((track) => {
      track.stop();
    });
    this.gif.destroy();
  }

  get video() {
    return document.getElementById(this.videoId);
  }
}

export default Gif;
