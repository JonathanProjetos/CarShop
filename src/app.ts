import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/error';
import routeCar from './routes/Car';
import routeMotocycle from './routes/Motorcycle';

const app = express();

app.use(express.json());
app.use(routeCar);
app.use(routeMotocycle);
app.use(errorHandler);

export default app;