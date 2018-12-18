import express from 'express';
import Logger from '../infrastructure/logger';
import config from '../infrastructure/config';
import startup from './startup';

const app = express();

startup(app);

app.listen(config.port, () => {
  Logger.info('Kubemap API started', {
    port: config.port,
  });
});
