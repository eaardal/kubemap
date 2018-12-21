import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import gzip from 'compression';
import useGlobalErrorHandler from './globalErrorHandler';
import useCors from './cors';
/* import useRestApi from '../restApi/restApi.bootstrapper';
import logger from '../infrastructure/logger';
import { getMapLayout } from '../restApi/mapLayouts/mapLayouts.router';
*/
import { getTransactionSystemPods } from '../restApi/kubeMaps/kubeMaps';
import K8sService from '../services/K8sService';

export default app => {
  useCors(app);

  // app.disable('etag');
  // app.disable('x-powered-by');
  app.use(express.static(`${__dirname}/../../public`));
  app.use(morgan('dev'));
  app.use(bodyParser.json({ type: ['json'] }));
  app.use(gzip());

  useGlobalErrorHandler(app);
  /*
  app.all('*', (req, res, next) => {
    logger.debug({ msg: 'RequestUrl', url: req.url });
    next();
  });
*/
  app.get('/', (req, res) => {
    res.send('This is the API for kubemap');
  });

  // useRestApi(app);

  app.get('/foo', async (req, res) => {
    try {
      const pods = await getTransactionSystemPods();
      res.status(200).send(pods);
    } catch (error) {
      console.log('error', error);
      res.status(500).send(error);
    }
  });

  app.get('/full', async (req, res) => {
    try {
      const s = new K8sService();
      const data = await s.getAllPodsRaw();
      res.status(200).send(data);
    } catch (error) {
      console.log('error', error);
      res.status(500).send(error);
    }
  });
};
