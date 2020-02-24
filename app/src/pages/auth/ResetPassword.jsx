import React from 'react';
import Auth from './Auth';

const ResetPassword = () => {
  const props = {
    title: 'Reset password',
    buttonText: 'Reset password',
    meta: {
      path: '/login/',
      name: 'Have an account? Login.',
    },
    forms: [
      {
        type: 'email',
        name: 'email',
        placeholder: 'Your Email',
        label: 'Email',
      },

    ],
    onSubmit: () => {},
  };
  return (
    <Auth {...props} />
  );
};

export default ResetPassword;