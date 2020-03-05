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
          target: 'idle',
        },
      },
    },
  },
};

export default { thumbnail, record, processing };
