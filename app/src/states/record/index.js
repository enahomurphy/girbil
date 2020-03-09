import { Machine } from 'xstate';
import services from './record.service';
import states from './record.state';

const recordMachine = Machine(
  {
    id: 'recorder',
    type: 'parallel',
    context: {
      video: null,
      thumbnail: '',
      recorder: {},
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
