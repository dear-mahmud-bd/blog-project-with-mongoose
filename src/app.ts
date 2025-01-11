import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.send('Hello TypeScript (^_^)');
};
app.get('/', getAController);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
