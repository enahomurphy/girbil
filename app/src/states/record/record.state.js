import { assign, send } from 'xstate';
import { f7 } from 'framework7-react';

const updateslide = () => {
  const slide = f7.swiper.get('.swiper-container');
  if (slide) {
    slide.lazy.load();
  }
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
        ADD_MESSAGE: {
          target: 'message_added',
          actions: assign((_, { message }) => ({ message })),
        },
      },
    },
    message_added: {
      on: {
        UPLOAD: {
          target: 'upload',
          actions: assign((_, { videoBlob, thumbnailBlob }) => ({
            videoBlob,
            thumbnailBlob,
          })),
        },
      },
    },
    upload: {
      invoke: {
        src: 'upload',
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
        src: 'upload',
        onDone: {
          target: 'idle',
          actions: updateslide,
        },
        onError: {
          target: 'error',
          actions: send('error'),
        },
      },
    },
    delete: {
      invoke: {
        src: 'deleteLocalMessageMessage',
        onDone: {
          target: 'idle',
          actions: send('idle'),
        },
        onError: {
          target: 'idle',
          actions: send('idle'),
        },
      },
    },
    error: {
      on: {
        RETRY_PROCESSING: 'retry',
        IDLE: 'idle',
        DELETE: 'delete',
      },
    },
  },
};

export default { record, processing };
