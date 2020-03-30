import { blobToFile } from './helpers';

/* eslint-disable no-undef */
class Recorder {
  constructor() {
    this.onMediaError = this.onMediaError.bind(this);
    this.onMediaStop = this.onMediaStop.bind(this);
    this.reset = this.reset.bind(this);
    this.media = new MediaRecorder(new MediaStream());

    this.onRecordStop = () => {};
    this.onDurationEnd = () => {};
    this.onRecordStart = () => {};
    this.onRecordError = () => {};
    this.onRecordThumbnail = () => {};
    this.onThumbnailStop = () => {};
  }

  initRecorder(stream) {
    this.media = new RecordRTC(stream, {
      type: 'video',
      timeSlice: 3000,
    });

    this.gif = new RecordRTC(stream, {
      type: 'gif',
      frameRate: 150,
      quality: 1,
    });
  }

  onMediaError(error) {
    this.onRecordError(error);
  }

  onMediaStop(blobURL) {
    this.onRecordStop(blobURL);
  }

  async stopRecordAndGetFile(name) {
    return new Promise((resolve) => {
      if (this.gif.state === 'active') {
        this.stopThumbnailRecord();
      }

      if (this.media.state !== 'inactive') {
        resolve(blobToFile(this.media.getBlob(), name));
      } else {
        this.media.stopRecording(() => {
          resolve(blobToFile(this.media.getBlob(), name));
        });
      }
    });
  }

  startRecord() {
    this.media.setRecordingDuration(Recorder.videoDuration).onRecordingStopped(() => {
      const blob = this.media.getBlob();
      this.onDurationEnd(blob);
    });


    this.gif.setRecordingDuration(Recorder.thumbnailDuration).onRecordingStopped(() => {
      const blob = this.gif.getBlob();
      this.onThumbnailStop(blob);
    });

    this.media.startRecording();
    this.gif.startRecording();
    this.onRecordStart();
  }

  async stopThumbnailRecord() {
    return new Promise((resolve) => {
      this.gif.stopRecording((blob) => {
        resolve(blob);
        this.onThumbnailStop(this.gif.getBlob(), blob);
      });
    });
  }

  reset() {
    this.media.destroy();
    this.gif.destroy();
  }

  file(name) {
    return new File([this.media.getBlob()], name, {
      lastModified: (new Date()).getTime(),
      type: 'video/webm',
    });
  }

  get url() {
    return this.media.toURL(this.media.blob);
  }

  static blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const dataUrl = reader.result;
        const base64EncodedData = dataUrl.split(',')[1];
        resolve(base64EncodedData);
      });

      reader.readAsDataURL(blob);
    });
  }

  static get videoDuration() {
    return 30000;
  }

  static get thumbnailDuration() {
    return 3000;
  }
}

export default Recorder;
