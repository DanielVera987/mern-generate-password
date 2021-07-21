import express from 'express';
import { error404Handler, errorHandler } from './middleware/errors';
import { errors } from 'celebrate';
import morgan from 'morgan';
import cors from 'cors';

import routerGenerate from './routes/index';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/generate', routerGenerate);

app.use(error404Handler);
app.use(errors());
app.use(errorHandler);

export default app;