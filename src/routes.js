// Node
import { Router } from 'express';
// Controllers
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
// Multer
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authVerification from './app/middleware/auth.js';
import adminMiddleware from './app/middleware/admin.js';

// Declaration Router
const routes = new Router();
// Multer declaration on upload, to upload image
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // Endingpoint --> Public || Create user
routes.post('/session', SessionController.store); // Endingpoint --> Public

routes.use(authVerification); // Everyone below receives middleware, auth

// Create product
routes.post(
  '/products',
  adminMiddleware,
  upload.single('file'),
  ProductController.store,
); // Endingpoint

// Update product
routes.put(
  '/product/:id',
  adminMiddleware,
  upload.single('file'),
  ProductController.update,
); // Endingpoint



routes.get('/products', ProductController.index); // Endingpoint

routes.post('/categories',
  adminMiddleware,
  upload.single('file'),
  CategoryController.store); // Endingpoint

routes.get('/categories', CategoryController.index); // Endingpoint


export default routes;
