/* eslint-disable no-undef */
class Recorder {
  constructor() {
    this.duration = 5000;

    this.onMediaError = this.onMediaError.bind(this);
    this.onMediaStop = this.onMediaStop.bind(this);
    this.thumbnail = this.thumbnail.bind(this);
    this.media = new MediaRecorder(new MediaStream());

    this.onRecordStop = () => {};
    this.onDurationEnd = () => {};
    this.onRecordStart = () => {};
    this.onRecordError = () => {};
    this.onRecordThumbnail = () => {};
  }

  initRecorder(stream) {
    this.media = new RecordRTC(stream, {
      type: 'video',
    });

    this.gif = new RecordRTC(stream, {
      type: 'gif',
    });
  }

  onMediaError(error) {
    this.onRecordError(error);
  }

  onMediaStop(blobURL) {
    this.onRecordStop(blobURL);
  }

  stopRecord() {
    this.onRecordStop(this.media.getBlob());
  }

  async stopRecordAndGetFile(name) {
    return new Promise((resolve) => {
      this.media.stopRecording(() => {
        resolve(this.file(name));
      });
    });
  }

  pauseRecord() {
    this.media.pause();
  }

  startRecord() {
    this.media.startRecording();
    this.onRecordStart();

    this.timeout = setTimeout(() => {
      this.onDurationEnd();
      clearTimeout(this.timeout);
    }, this.duration);
  }

  async thumbnail() {
    this.gif.startRecording();
    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    await sleep(2000);

    return new Promise((resolve) => {
      this.gif.stopRecording(() => {
        const blob = this.gif.getBlob();
        resolve(blob);
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
}

export default Recorder;
