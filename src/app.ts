import express from 'express';
import handleError from './middleware/error';
import routeCar from './routes/Car';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(routeCar);
app.use(handleError);

export default app;
