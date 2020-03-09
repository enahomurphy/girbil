import { Machine } from 'xstate';
import services from './record.service';
import states from './record.state';

const recordMachine = Machine(
  {
    id: 'recorder',
    type: 'parallel',
    context: {
      video: null,
      recorder: {},
      urls: {},
      addMessage: () => {},
      getUploadURLS: () => {},
    },
    states,
  },
  {
    services,
  },
);

export default recordMachine;
