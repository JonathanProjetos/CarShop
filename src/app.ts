import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/error';
import routeCar from './routes/Car';

const app = express();

app.use(express.json());
app.use(routeCar);
app.use(errorHandler);

export default app;