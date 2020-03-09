const thumbnail = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        CREATE: 'create',
      },
    },
    create: {
      on: {
        DONE: 'done',
      },
    },
    done: {
      type: 'final',
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
        GET_URLS: 'urls',
        PROCESS: 'processing',
      },
    },
    urls: {
      invoke: {
        src: 'getUploadUrls',
        onDone: {
          action: (context) => {
            console.log(context);
          },
        },
        onError: {
          action: (error) => {
            console.log(error);
          },
        },
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
          // target: 'idle',
          action: () => {
            console.log('an error occured');
          },
        },
      },
    },
  },
};

export default { thumbnail, record, processing };
