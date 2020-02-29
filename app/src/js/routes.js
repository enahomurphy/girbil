import {
  Conversation, Conversations, Message, NewMessage,
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
      },
    ],
  },
];

export default routes;
