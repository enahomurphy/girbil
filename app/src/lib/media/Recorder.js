import GIF from 'gif.js.optimized';

class Recorder {
  constructor(thumbnailWidth = 300, thumbnailHieght = 300) {
    this.thumbnailWidth = thumbnailWidth;
    this.thumbnailHieght = thumbnailHieght;
    this.chunks = [];
    this.thumbnailChunk = [];

    this.onMediaData = this.onMediaData.bind(this);
    this.onMediaError = this.onMediaError.bind(this);
    this.onMediaStop = this.onMediaStop.bind(this);
    this.media = new MediaRecorder(new MediaStream());

    this.onRecordStop = () => {};
    this.onRecordError = () => {};
    this.onRecordRecordThumbnail = () => {};
  }

  initRecorder(stream) {
    this.media = new MediaRecorder(stream, Recorder.options);

    this.media.ondataavailable = this.onMediaData;
    this.media.onerror = this.onMediaError;
    this.media.onstop = this.onMediaStop;
  }

  onMediaData(event) {
    if (!this.thumbnailChunk.length) {
      this.thumbnailChunk.push(event.data);
      this.onRecordRecordThumbnail(event.data);
    }

    this.chunks.push(event.data);
  }

  onMediaError(error) {
    this.onRecordError(error);
  }

  onMediaStop() {
    this.onRecordStop(this.url);
  }

  stopRecord() {
    if (this.media.state !== 'inactive') {
      this.media.stop();
    }
  }

  pauseRecord() {
    this.media.pause();
  }

  resumeRecord() {
    this.media.resume();
  }

  startRecord() {
    if (this.media.state !== 'recording') {
      this.media.start(20);
    }
  }

  reset() {
    this.chunks = [];
  }

  file(name) {
    const blob = new Blob(this.chunks, { type: 'video/webm' });
    return new File([blob], name, {
      lastModified: (new Date()).getTime(),
      type: 'video/webm',
    });
  }

  // @TODO move worker into porject
  async thumbnail() {
    const video = document.createElement('video');
    video.src = this.url;
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.height = this.height;
    video.width = this.width;
    video.style.objectFit = 'contain';
    video.play();

    let time = 0;

    const gif = new GIF({
      workers: 4,
      workerScript: '/static/workers/gif.js',
    });

    return new Promise((resolve) => {
      gif.on('finished', (blob) => {
        gif.freeWorkers.forEach((w) => w.terminate());
        resolve(URL.createObjectURL(blob));
      });

      const timeUpdated = () => {
        time += 1;
        gif.addFrame(video, {
          quality: 1, repeat: 'forever', copy: true, delay: 200,
        });

        if (time > 5) {
          gif.render();
          video.pause();
          video.removeEventListener('timeupdate', timeUpdated);
        }
      };

      video.addEventListener('timeupdate', timeUpdated);
    });
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
