class Recorder {
  constructor(stream) {
    this.media = new MediaRecorder(stream, Recorder.options);
    this.chunks = [];
    this.onMediaData = this.onMediaData.bind(this);
    this.onMediaError = this.onMediaError.bind(this);
    this.onMediaStop = this.onMediaStop.bind(this);

    this.media.ondataavailable = this.onMediaData;
    this.media.onerror = this.onMediaError;
    this.media.onstop = this.onMediaStop;
  }

  onMediaData(event) {
    this.chunks.push(event.data);
  }

  onMediaError(error) {
    console.info('started', this.chunks, error);
    // TODO: Handle error properly
  }

  onMediaStop() {
    this.download();
  }

  stop() {
    this.media.stop();
  }

  pause() {
    this.media.pause();
  }

  resume() {
    this.media.resume();
  }

  start() {
    this.media.start(10);
  }

  static download() {
    // TODO
  }

  get url() {
    const blob = new Blob(this.chunks, { type: 'video/webm' });
    return window.URL.createObjectURL(blob);
  }

  static get options() {
    let options = {};
    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
      options = { mimeType: 'video/webm;codecs=vp9' };
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
      options = { mimeType: 'video/webm;codecs=h264' };
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
      options = { mimeType: 'video/webm;codecs=vp8' };
    }

    return options;
  }
}

export default Recorder;
