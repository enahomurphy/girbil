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
    path: '/preferences',
    async(routeTo, routeFrom, resolve) {
      const reactComponent = () => import('@/pages/Preferences');
      reactComponent().then((rc) => {
        resolve({ component: rc.default });
      });
    },
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
    path: '/conversations/:conversationId/thread/:threadId',
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
        path: '/message/:messageId',
        id: 'thread-view',
        component: Message,
        options: {
          ignoreCache: true,
        },
      },
    ],
  },
  {
    path: '/users',
    name: 'profile',
    routes: [
      {
        name: 'user-profile',
        path: '/:userId/profile',
        async(routeTo, routeFrom, resolve) {
          const reactComponent = () => import('@/pages/User/Profile');
          reactComponent().then((rc) => {
            resolve({ component: rc.default });
          });
        },
        options: {
          props: {
            title: 'Create a Channel',
          },
        },
      },
    ],
  },
  {
    name: 'channels',
    path: '/channels',
    async(routeTo, routeFrom, resolve) {
      const reactComponent = () => import('@/pages/Channel/Channel');
      reactComponent().then((rc) => {
        resolve({ component: rc.default });
      });
    },
    routes: [
      {
        name: 'channels-create',
        path: '/create',
        async(routeTo, routeFrom, resolve) {
          const reactComponent = () => import('@/pages/Channel/Create');
          reactComponent().then((rc) => {
            resolve({ component: rc.default });
          });
        },
        options: {
          props: {
            title: 'Create a Channel',
          },
        },
      },
      {
        name: 'channels-edit',
        path: '/:channelId/edit',
        async(routeTo, routeFrom, resolve) {
          const reactComponent = () => import('@/pages/Channel/Create');
          reactComponent().then((rc) => {
            resolve({ component: rc.default });
          });
        },
        options: {
          props: {
            title: 'Edit Channel',
          },
        },
      },
      {
        name: 'channels-view',
        path: '/:channelId',
        async(routeTo, routeFrom, resolve) {
          const reactComponent = () => import('@/pages/Channel/ViewChannel');
          reactComponent().then((rc) => {
            resolve({ component: rc.default });
          });
        },
      },
      {
        name: 'channels-add-people',
        path: '/:channelId/add-people',
        async(routeTo, routeFrom, resolve) {
          const reactComponent = () => import('@/pages/Channel/AddPeople/index');
          reactComponent().then((rc) => {
            resolve({ component: rc.default });
          });
        },
        options: {
        },
      },
    ],
  },
];

export default routes;
