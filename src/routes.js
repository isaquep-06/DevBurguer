// Node
import { Router } from 'express';
// Controllers
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';

// Multer
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authVerification from './app/middleware/auth.js';
import adminMiddleware from './app/middleware/admin.js';

// ======= Declaration Router =========
const routes = new Router();
// Multer declaration on upload, to upload image
const upload = multer(multerConfig);

// ========== Login Users or Admin ===========
routes.post('/users', UserController.store); // Endingpoint --> Public || Create user (REGISTER)
routes.post('/session', SessionController.store); // Endingpoint --> Public --> ( LOGIN )
routes.get('/categories', CategoryController.index); // Endingpoint --> Get all categories <--

routes.use(authVerification); // Everyone below receives middleware, auth

// ================================ Producsts ==========================
routes.post(
  '/products',
  adminMiddleware,
  upload.single('file'),
  ProductController.store,
); // Endingpoint --> Create Product <--


routes.put(
  '/product/:id',
  adminMiddleware,
  upload.single('file'),
  ProductController.update,
); // Endingpoint

routes.get('/products', ProductController.index); // Endingpoint --> Updated product <--


// =================== Categories ======================
routes.post('/categories',
  adminMiddleware,
  upload.single('file'),
  CategoryController.store); // Endingpoint --> Create category <--


// ================== Orders ===================
routes.post('/orders', OrderController.store)
routes.put('/orders/:id', adminMiddleware, OrderController.update)
routes.get('/orders', OrderController.index)
export default routes;
