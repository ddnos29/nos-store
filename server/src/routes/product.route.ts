import { Router } from 'express';

import { productController } from '../controllers/product.controller';
import {
    authentication,
    asyncHandler,
    roleCheck,
} from '../middlewares/checkAuth';
import { upload } from '../middlewares/upload';
import { productValidator } from '../utils/validators/product.validator';
const router = Router();

router.get('/', asyncHandler(productController.getAllProducts));

router.get('/slug', asyncHandler(productController.getAllSlug));

router.get('/top12', asyncHandler(productController.getTop12Products));

router.get('/:id', asyncHandler(productController.getProductById));

router.get('/related/:id', asyncHandler(productController.getRelatedProducts));

router.post(
    '/create',
    upload,
    productValidator.createProduct,
    asyncHandler(productController.createProduct)
);

router.use(authentication);
router.use(roleCheck);

router.post(
    '/',
    upload,
    productValidator.createProduct,
    asyncHandler(productController.createProduct)
);

router.put(
    '/:id',
    upload,
    productValidator.updateProduct,
    asyncHandler(productController.updateProduct)
);

router.delete('/:id', asyncHandler(productController.deleteProduct));

export default router;
