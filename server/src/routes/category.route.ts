import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { authentication, asyncHandler, roleCheck } from '../middlewares/checkAuth';
import { categoryValidator } from '../utils/validators/category.validator';

const router = Router();

router.get('/', asyncHandler(categoryController.getAllCategory));

router.use(authentication);
router.use(roleCheck);

router.post('/', asyncHandler(categoryController.createCategory));

router.put('/:id', asyncHandler(categoryController.updateCategory));

router.delete('/:id', asyncHandler(categoryController.deleteCategory));

export default router;
