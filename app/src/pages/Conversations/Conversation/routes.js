
import NewMessage from './NewMessage';
import Message from './Message';

export const conversationRoutes = [
  {
    path: '/conversations/:conversationId/record',
    id: 'record',
    component: NewMessage,
    options: {
      props: {
        isThread: false,
      },
      transition: 'f7-fade',
    },
  },
  {
    path: '/conversations/:conversationId/messages/:messageId',
    id: 'view',
    component: Message,
    options: {
      props: {
        isThread: false,
      },
      transition: 'f7-fade',
    },
  },
  {
    path: '/conversations/:conversationId/thread/:threadId/record',
    id: 'thread-record',
    component: NewMessage,
    options: {
      clearPreviousHistory: true,
      transition: 'f7-cover-v',
      props: {
        isThread: true,
      },
    },

  },
  {
    path: '/conversations/:conversationId/thread/:threadId/messages/:messageId',
    id: 'thread-view',
    component: Message,
    options: {
      transition: 'f7-fade',
      props: {
        isThread: true,
      },
    },
  },
];

export default conversationRoutes;