import { } from 'framework7-react';
import HomePage from '../pages/Home';
import { Login } from '../pages/Auth';

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
];

export default routes;
