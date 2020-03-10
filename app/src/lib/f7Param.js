import { f7 } from 'framework7-react';

import { get } from '@shared/lib';

export const getParam = (path) => {
  return get(
    f7,
    `views.main.router.currentRoute.params.${path}`,
    ''
  );
}

export const getParams = (params) => {
  return params.reduce((acc, name) => {
    console.log(getParam(name))
    return { ...acc, [name]: getParam(name) }
  }, {});
}