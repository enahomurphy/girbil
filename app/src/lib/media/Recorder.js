import { getSeekableBlob } from './helpers';

class Recorder {
  constructor(duration) {
    this.onStopRecorder = () => {};
    this.duration = duration;
    this.preview = [];
    this.playing = false;
    this.chunks = [];

    this.stopRecording = this.stopRecording.bind(this);
    this.recorderStopHandler = this.recorderStopHandler.bind(this);
    this.startRecording = this.startRecording.bind(this);

    this.videoType = 'video/webm;codecs=vp9';
  }

  async recorderStopHandler() {
      try {
        this.playing = false;
        const videoBlob = await getSeekableBlob(new Blob(this.chunks, { type: this.videoType }));
        const thumbnailBlob = new Blob(this.preview, { type: this.videoType });
    
        const url =  URL.createObjectURL(videoBlob);
        const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

        this.onStopRecorder({ videoBlob, thumbnailBlob, url, thumbnailUrl });
    } catch (error) {
      //@TODO log error to error service
      console.error(error);
    } finally {
      this.preview = [];
      this.chunks = [];
    }
  }

  startRecording() {
    const timeSlice = 1000;
    if (this.stream) {
      this.recorder = new MediaRecorder(this.stream, { type: this.videoType });

      this.recorder.ondataavailable = ({ data }) => {
        this.chunks.push(data);

        if (this.preview.length <= 1) {
          this.preview.push(data);
        }
      }


      this.recorder.onstop = () => {
        this.recorderStopHandler();
      }
  
      this.recorder.start(timeSlice);
      this.playing = true;
    }
  }

  stopRecording() {
    if (this.recorder.state === 'recording') {
      this.recorder.stop();
    }
  }
}

export default Recorder;
