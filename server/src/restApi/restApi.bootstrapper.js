import config from '../infrastructure/config';
import kubeMaps from './kubeMaps/kubeMaps.router';

export default app => {
  app.use(`${config.restApi.baseUrl}/kube-maps`, kubeMaps());
};
