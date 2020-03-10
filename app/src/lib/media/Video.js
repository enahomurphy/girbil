import Recorder from './Recorder';

class Video extends Recorder {
  constructor(videoId, width, height) {
    super();

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
      this.constraints,
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
  }

  get video() {
    return document.getElementById(this.videoId);
  }

  get constraints() {
    const constraints = {
      audio: true,
      video: {
        width: { min: 100, ideal: this.width, max: this.width },
        height: { min: 120, ideal: this.height, max: this.height },
        framerate: 30,
      },
    };

    return constraints;
  }
}

export default Video;
