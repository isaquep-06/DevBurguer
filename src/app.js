import express from 'express';
import cors from 'cors'
import routes from './routes.js';
import './database/index.js';
import fileConfigRoute from './config/fileRoutes.cjs';

const app = express();
app.use(cors())

app.use(express.json());

app.use('/product-file', fileConfigRoute)
app.use('/categories-file', fileConfigRoute)

app.use(routes);
export default app;
