import { } from 'framework7-react';
import { Messages, Conversations } from '@/pages/Conversations';
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
    name: 'conversation_messages',
    path: '/conversations',
    component: Conversations,
    options: {
      animate: true,
      transition: 'f7-parallax',
    },
  },
  {
    name: 'conversations',
    path: '/conversations/:conversationId/messages/:messageId',
    component: Messages,
    options: {
      animate: true,
      transition: 'f7-parallax',
    },
  },
];

export default routes;
