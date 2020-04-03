import { assign, send } from 'xstate';
import { f7 } from 'framework7-react';

const updateslide = () => {
  const slide = f7.swiper.get('.swiper-container');
  if (slide) {
    // slide.lazy.load();
  }
};

const thumbnail = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        UPLOAD_THUMBNAIL: {
          target: 'url',
          actions: assign((_, ctx) => ({ thumbnail: ctx.thumbnail })),
        },
      },
    },
    url: {
      target: 'idle',
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
          actions: assign((_, { message, conversationId, getUploadURLS }) => ({
            message,
            conversationId,
            getUploadURLS,
          })),
        },
        PROCESS: {
          target: 'processing',
          actions: assign((_, {
            file, parentId, messageId,
          }) => ({
            file,
            parentId,
            messageId,
          })),
        },
      },
    },
    urls: {
      invoke: {
        src: 'getUploadUrls',
        onDone: {
          actions: assign((_, { data }) => ({ urls: data.urls })),
        },
      },
      on: {
        PROCESS: {
          target: 'processing',
          actions: assign((_, {
            file, parentId, messageId,
          }) => ({
            file,
            parentId,
            messageId,
          })),
        },
      },
    },
    processing: {
      invoke: {
        src: 'processing',
        onDone: {
          target: 'idle',
          actions: () => {
            // tiny hack to fix thumbnails not loading after upload
            updateslide();
          },
        },
        onError: {
          target: 'error',
          actions: ({ updateState, message }) => {
            updateState({ messageId: message.id, state: 'error' });
          },
        },
      },
    },
    retry: {
      invoke: {
        src: 'retry',
        onDone: {
          target: 'idle',
          actions: updateslide,
        },
        onError: {
          target: 'idle',
          actions: send('error'),
        },
      },
    },
    error: {
      on: {
        RETRY_PROCESSING: 'retry',
        IDLE: 'idle',
      },
    },
  },
};

export default { thumbnail, record, processing };
