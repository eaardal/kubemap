import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'kubemap',
  streams: [{ stream: process.stdout }],
  serializers: bunyan.stdSerializers,
});

logger.level('debug');

export default logger;
