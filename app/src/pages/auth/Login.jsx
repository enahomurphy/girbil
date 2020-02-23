import React from 'react';
import Auth from './Auth';

const SignUp = () => {
  const props = {
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
    onSubmit: () => {},
  };
  return (
    <Auth {...props} />
  );
};

export default SignUp;
