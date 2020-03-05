class Recorder {
  constructor(stream, thumbnailWidth, thumbnailHieght) {
    this.media = new MediaRecorder(stream, Recorder.options);
    this.thumbnailWidth = thumbnailWidth;
    this.thumbnailHieght = thumbnailHieght;
    this.chunks = [];
    this.onMediaData = this.onMediaData.bind(this);
    this.onMediaError = this.onMediaError.bind(this);
    this.onMediaStop = this.onMediaStop.bind(this);

    this.media.ondataavailable = this.onMediaData;
    this.media.onerror = this.onMediaError;
    this.media.onstop = this.onMediaStop;

    this.onStop = () => {};
    this.onError = () => {};
  }

  onMediaData(event) {
    this.chunks.push(event.data);
  }

  onMediaError(error) {
    this.onError(error);
  }

  onMediaStop() {
    this.onStop(this.url);
  }

  stop() {
    if (this.media.state !== 'inactive') {
      this.media.stop();
    }
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

  get thumbnail() {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const video = document.createElement('video');
      const ctx = canvas.getContext('2d');
      video.src = this.url;
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;

      const onMetaLoaded = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.play();
      };

      const timeUpdated = () => {
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const image = canvas.toDataURL();
        video.pause();
        video.removeEventListener('timeupdate', timeUpdated);
        video.removeEventListener('loadedmetadata', onMetaLoaded);
        resolve(image);
      };

      video.addEventListener('timeupdate', timeUpdated);
      video.addEventListener('loadedmetadata', onMetaLoaded);

      return '';
    });
  }

  get url() {
    const blob = new Blob(this.chunks, { type: 'video/webm' });
    return window.URL.createObjectURL(blob);
  }

  get file() {
    return new Blob(this.chunks, { type: 'video/webm' });
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
