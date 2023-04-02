import { Router } from 'express';
import { brandController } from '../controllers/brand.controller';
import {
    authentication,
    asyncHandler,
    roleCheck,
} from '../middlewares/checkAuth';
import { brandValidator } from '../utils/validators/brand.validator';
const router = Router();

router.get('/', asyncHandler(brandController.getAllBrand));

router.use(authentication);
router.use(roleCheck);

router.post(
    '/',
    brandValidator.create,
    asyncHandler(brandController.createBrand)
);

router.put(
    '/:id',
    brandValidator.checkParamId,
    brandValidator.update,
    asyncHandler(brandController.updateBrand)
);

router.delete(
    '/:id',
    brandValidator.checkParamId,
    asyncHandler(brandController.deleteBrand)
);

export default router;
