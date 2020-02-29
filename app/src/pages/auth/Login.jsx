import React from 'react';
import { f7 } from 'framework7-react';

import Auth from './Auth';

const form = {
  title: 'Login',
  buttonText: 'Login',
  meta: {
    path: '/reset-password/',
    name: 'Forgot password?',
  },
  forms: [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Your Email',
      label: 'Email',
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Your Password',
      label: 'Password',
    },
  ],
  onSubmit: () => {
    f7.views.main.router.navigate(
      {
        name: 'messages',
        params: { messageId: 1 },
      },
      {
        animate: true,
      },
    );
  },
};

const Login = () => {
  form.onSubmit = () => {
    console.info('I was called');
  };

  return (
    <>
      <Auth {...form} />
    </>
  );
};

export default Login;
