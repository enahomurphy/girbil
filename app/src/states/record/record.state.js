import { assign } from 'xstate';

const thumbnail = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        UPLOAD_URL: {
          target: 'url',
          actions: assign((_, { urls }) => ({ urls }))
        },
      },
    },
    url: {
      on: {
        UPLOAD_THUMBNAIL: 'upload',
      },
    },
    upload: {
      invoke: {
        src: 'uploadThumbnail',
        onDone: {
          target: 'idle',
        },
        onError: {
          // @TODO handle thumbnail upload failure
          // ideas, cache for retry
          // or retry twice before failing completely
        },
        on: {
          DONE: 'idle',
        },
      }
    },
  },
};

const record = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: 'start',
      },
    },
    start: {
      on: {
        STOP: 'stop',
      },
    },
    stop: {
      on: {
        '': 'idle',
      },
    },
  },
};

const processing = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        GET_URLS: {
          target: 'urls',
          actions: assign((_, { message }) => ({ message }))
        },
        PROCESS: 'processing',
      },
    },
    urls: {
      invoke: {
        src: 'getUploadUrls',
      },
      on: {
        PROCESS: 'processing',
      },
    },
    processing: {
      invoke: {
        src: 'processing',
        onDone: {
          target: 'idle',
        },
        onError: {
          // @TODO handle video upload failure
          // ideas, cache for retry
          // or retry twice before failing completely
        },
      },
    },
  },
};

export default { thumbnail, record, processing };
