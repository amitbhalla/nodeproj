import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

//  Base config
const PORT = 3000;
const ADDR = '0.0.0.0';
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Router

// Mounted Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//  Event loop
app.listen(PORT, ADDR, () => console.log(`listening to ${PORT} on ${ADDR}`));
