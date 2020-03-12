import {
  Conversation, Conversations, Message, NewMessage, Thread,
} from '@/pages/Conversations';
import { Login, SignUp, ResetPasword } from '@/pages/Auth';
import HomePage from '@/pages/Home';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: Login,
    options: {
      animate: true,
      transition: 'f7-parallax',
    },
  },
  {
    path: '/signup/',
    component: SignUp,
    options: {
      animate: true,
      transition: 'f7-parallax',
    },
  },
  {
    path: '/reset-password/',
    component: ResetPasword,
    options: {
      animate: true,
      transition: 'f7-parallax',
    },
  },
  {
    path: '/users/:userId/profile',
    name: 'profile',
    async(routeTo, routeFrom, resolve) {
      const reactComponent = () => import('@/pages/User/Profile');
      reactComponent().then((rc) => {
        resolve({ component: rc.default });
      });
    },
    options: {
      animate: true,
      transition: 'f7-parallax',
    },
  },
  {
    name: 'conversations',
    path: '/conversations',
    component: Conversations,
    options: {
      animate: true,
      transition: 'f7-parallax',
    },
  },
  {
    name: 'conversation',
    path: '/conversations/:conversationId',
    component: Conversation,
    tabs: [
      {
        path: '/',
        id: 'record',
        component: NewMessage,
      },
      {
        path: '/:messageId',
        id: 'view',
        component: Message,
        options: {
          props: {
            isThread: false,
          },
          animate: true,
          transition: 'f7-cover-v',
        },
      },
    ],
  },
  {
    name: 'thread',
    path: '/conversations/:conversationId/:threadId/thread',
    id: 'view',
    component: Thread,
    options: {
      animate: true,
      transition: 'f7-cover-v',
      props: {
        reloadPrevious: true,
        reloadCurrent: true,
        ignoreCache: true,
        isThread: true,
      },
    },
    tabs: [
      {
        path: '/',
        id: 'thread-record',
        component: NewMessage,
        props: {
          ignoreCache: true,
          isThread: true,
        },
      },
      {
        path: '/:messageId',
        id: 'thread-view',
        component: Message,
        options: {
          ignoreCache: true,
        },
      },
    ],
  },
];

export default routes;
