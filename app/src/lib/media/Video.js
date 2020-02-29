class Video {
  constructor(videoId) {
    this.videoId = videoId;
    this.stream = new MediaStream();
    this.start = this.start.bind(this);
    this.error = this.error.bind(this);
    this.height = window.screen.availHeight;
    this.width = window.screen.availWidth;
    this.onStart = () => {};

    this.init();
  }

  init() {
    this.useMedia();
  }

  useMedia() {
    navigator.getUserMedia(
      Video.constraints,
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

  static get constraints() {
    const constraints = {
      audio: false,
      video: {
        width: { min: this.width, ideal: this.width, max: this.width * 2 },
        height: { min: this.height, ideal: this.height, max: this.height * 2 },
        framerate: 30,
      },
    };

    return constraints;
  }
}

export default Video;
