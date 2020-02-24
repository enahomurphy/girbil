class Video {
  constructor(videoId) {
    this.videoId = videoId;
    this.stream = new MediaStream();
    this.start = this.start.bind(this);

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

    if (this.onStart) {
      this.onStart(this.stream);
    }
  }

  error(error) {
    console.info(this.videoId, error);
  }

  get video() {
    return document.getElementById(this.videoId);
  }

  static get constraints() {
    const { width, height } = window.screen;
    const constraints = {
      audio: false,
      video: {
        width: { min: width, ideal: width, max: width * 2 },
        height: { min: height, ideal: height, max: height * 2 },
        framerate: 30,
      },
    };

    return constraints;
  }
}

export default Video;
