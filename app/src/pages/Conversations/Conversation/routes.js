
import NewMessage from './NewMessage';
import Message from './Message';

export const conversationRoutes = [
  {
    path: '/conversations/:conversationId/record',
    id: 'record',
    component: NewMessage,
  },
  {
    path: '/conversations/:conversationId/messages/:messageId',
    id: 'view',
    component: Message,
    options: {
      props: {
        isThread: false,
      },
      animate: true,
      transition: 'f7-fade',
    },
  },
];

export default conversationRoutes;
