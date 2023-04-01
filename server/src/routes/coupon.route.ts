import { Router } from 'express';

import { couponController } from '../controllers/coupon.controller';
import { asyncHandler, authentication, roleCheck } from '../middlewares/checkAuth';

import { couponValidator } from '../utils/validators/coupon.validator';

const router = Router();

router.get('/', asyncHandler(couponController.getAllCoupon));

router.get('/:id', couponValidator.checkParamId, asyncHandler(couponController.getCouponById));

router.post('/', couponValidator.createCoupon, asyncHandler(couponController.createCoupon));

router.put('/:id', couponValidator.updateCoupon, asyncHandler(couponController.updateCoupon));

router.delete('/:id', couponValidator.checkParamId, asyncHandler(couponController.deleteCoupon));

router.put('/disabled/:id', couponValidator.checkParamId, asyncHandler(couponController.disabledCoupon));

router.post('/use/:id', couponValidator.checkParamId, asyncHandler(couponController.useCoupon));

export default router;
