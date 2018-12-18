import Logger from '../infrastructure/logger';
import respondWith from '../helpers/respondWith';

export default app => {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    Logger.error('An unhandled error occurred', err);
    return respondWith(res).internalServerError();
  });
};
