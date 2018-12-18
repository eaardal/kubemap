import express from 'express';
import Logger from './logger';
import RequestUtil from '../utils/RequestUtil';

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    Logger.error(`Request to ${RequestUtil.constructFullUrl(req)} failed`, err);
    next(err);
  });
};

const createRouter = () => ({
  router: express.Router(),
  execute: asyncMiddleware,
});

export default createRouter;
