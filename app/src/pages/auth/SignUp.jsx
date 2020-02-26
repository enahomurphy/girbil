import React from 'react';
import Auth from './Auth';

const Login = () => {
  const props = {
    title: 'Sign up',
    buttonText: 'Sign up',
    meta: {
      path: '/login/',
      name: 'Have an account? Login.',
    },
    forms: [
      {
        type: 'text',
        name: 'name',
        placeholder: 'Your Name',
        label: 'Name',
      },
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
    onSubmit: () => {},
  };
  return (
    <Auth {...props} />
  );
};

export default Login;
