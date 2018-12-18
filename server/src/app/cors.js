import cors from 'cors';

export default app => {
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    exposedHeaders: ['Location'],
    credentials: true,
  };

  app.use(cors(corsOptions));
};
