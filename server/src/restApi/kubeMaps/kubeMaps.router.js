import createRouter from '../../infrastructure/routerFactory';
import respondWith from '../../helpers/respondWith';
import logger from '../../infrastructure/logger';

const getMapLayout = async (req, res) => {
  try {
    const mapLayout = {
      nodes: [
        {
          name: 'session-initiator',
          x: 100,
          y: 100,
          width: 250,
          height: 100
        },
        {
          name: 'transaction-engine',
          x: 500,
          y: 100,
          width: 250,
          height: 100
        }
      ]
    };
    return respondWith(res).ok(mapLayout);
  } catch (error) {
    logger.error(error);
    return respondWith(res).internalServerError(error);
  }
};

export default () => {
  const { router, execute } = createRouter();

  router.route('/').get(execute(getMapLayout));

  router.route('/:id').get(execute(getMapLayout));

  return router;
};
