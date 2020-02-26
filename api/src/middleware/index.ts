import loggerMiddleware from './requestLogger';

export { default as passportMiddleware } from './passport';

export default [loggerMiddleware];
