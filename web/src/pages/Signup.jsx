import React from 'react';
import {
  useParams,
} from 'react-router-dom';

import { First, Second } from '@/modules/signup';

const Signup = () => {
  const { step } = useParams();

  switch (step) {
    case '1':
      return <First />;
    case '2':
      return <Second />;
    default:
      return null;
  }
};

export default Signup;
