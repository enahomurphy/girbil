import React from 'react';
import {
  useParams,
} from 'react-router-dom';

import First from './Steps/First';
import Second from './Steps/Second';
import Third from './Steps/Third';

const Create = () => {
  const { step } = useParams();

  switch (step) {
    case '1':
      return <First />;
    case '2':
      return <Second />;
    case '3':
      return <Third />;
    default:
      return null;
  }
};

export default Create;
