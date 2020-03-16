import { f7 } from 'framework7-react';

import { get } from '@shared/lib';

export const getParam = (path) => get(
  f7,
  `views.main.router.currentRoute.params.${path}`,
  '',
);

export const getParams = (params) => (
  params.reduce((acc, name) => ({ ...acc, [name]: getParam(name) }), {})
);
