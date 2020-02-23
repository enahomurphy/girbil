import { } from 'framework7-react';
import HomePage from '../pages/Home';
import { Login, SignUp, ResetPasword } from '../pages/Auth';

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
];

export default routes;
