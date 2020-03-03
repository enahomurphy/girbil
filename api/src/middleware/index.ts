import loggerMiddleware from './requestLogger';
import authenticated from './authenticated';
import authorized from './authorized';

export {
  authenticated,
  loggerMiddleware,
  authorized,
};

export default [
  loggerMiddleware,
  authenticated,
];
