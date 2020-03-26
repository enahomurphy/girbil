import Axios from 'axios';
import { blobToFile } from './helpers';

/* eslint-disable no-undef */
class Recorder {
  constructor() {
    this.duration = 30000;
    this.thumbnailDuration = 3000;

    this.onMediaError = this.onMediaError.bind(this);
    this.onMediaStop = this.onMediaStop.bind(this);
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

    this.gif = new RecordRTC(stream, { type: 'gif' });
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
        clearTimeout(this.thumbnailTimeout);
      }
      this.media.stopRecording(() => {
        resolve(blobToFile(this.media.getBlob(), name));
      });
    });
  }

  startRecord() {
    this.media.startRecording();
    this.gif.startRecording();
    this.onRecordStart();

    this.thumbnailTimeout = setTimeout(() => {
      this.stopThumbnailRecord();
      clearTimeout(this.thumbnailTimeout);
    }, this.thumbnailDuration);

    this.timeout = setTimeout(() => {
      this.onDurationEnd();
      clearTimeout(this.timeout);
    }, this.duration);
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

  static async getMediaDevices() {
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();

    const result = {
      microphone: [],
      speaker: [],
      video: [],
    };

    deviceInfos.forEach((deviceInfo) => {
      if (deviceInfo.kind === 'audioinput') {
        result.microphone.push(deviceInfo);
      } else if (deviceInfo.kind === 'audiooutput') {
        result.speaker.push(deviceInfo);
      } else if (deviceInfo.kind === 'videoinput') {
        result.video.push(deviceInfo);
      }
    });

    return result;
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

  static async upload(blob) {
    const data = await Recorder.blobToBase64(blob);
    const body = JSON.stringify({ data });
    Axios({
      method: 'POST',
      url: `${process.env.API_URL}/api`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default Recorder;
