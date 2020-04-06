import RecordRTC, { getSeekableBlob } from 'recordrtc/RecordRTC';

class Recorder {
  constructor(duration) {
    this.onStopRecorder = () => {};
    this.duration = duration;
    this.preview = [];
    this.playing = false;

    this.stopRecording = this.stopRecording.bind(this);
    this.recorderStopHandler = this.recorderStopHandler.bind(this);
    this.startRecording = this.startRecording.bind(this);

    this.videoType = 'video/webm;codecs=vp9';
  }

  recorderStopHandler() {
    this.playing = false;
    getSeekableBlob(this.recorder.getBlob(), (videoBlob) => {
      const url = this.recorder.toURL();
      const thumbnailBlob = new Blob(this.preview, { type: this.videoType });
      this.preview = [];
      this.onStopRecorder({ videoBlob, thumbnailBlob, url });
    });
  }

  startRecording() {
    this.recorder = new RecordRTC(this.stream, {
      type: this.videoType,
      timeSlice: 1000,
      ondataavailable: (blobs) => {
        if (this.preview.length <= 1) {
          this.preview.push(blobs);
        }
      },
    });

    this.recorder
      .setRecordingDuration(this.duration)
      .onRecordingStopped(this.recorderStopHandler);

    this.recorder.startRecording();
    this.playing = true;
  }

  stopRecording() {
    if (this.recorder.getState() === 'recording') {
      this.recorder.stopRecording(() => {
        this.recorderStopHandler();
      });
    }
  }
}

export default Recorder;
