class Video {
  constructor(videoId, width, height) {
    this.videoId = videoId;
    this.stream = new MediaStream();
    this.start = this.start.bind(this);
    this.error = this.error.bind(this);
    this.init = this.init.bind(this);
    this.height = height || window.screen.height - 125;
    this.width = width || window.screen.width;
    this.onStart = () => {};
  }

  init() {
    this.useMedia();
  }

  useMedia() {
    navigator.getUserMedia(
      this.constraints,
      this.start,
      this.error,
    );
  }

  start(stream) {
    this.stream = stream;
    this.video.srcObject = stream;
    this.video.play();
    this.onStart(this.stream);
  }

  error(error) {
    console.info(this.videoId, error);
  }

  get video() {
    return document.getElementById(this.videoId);
  }

  get constraints() {
    const constraints = {
      audio: true,
      video: {
        width: { min: 300, ideal: this.width, max: this.width },
        height: { min: 500, ideal: this.height, max: this.height },
        framerate: 30,
      },
    };

    return constraints;
  }
}

export default Video;
