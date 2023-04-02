import { Router } from 'express';

import { orderController } from '@src/controllers/order.controller';

import { authentication, asyncHandler } from '@src/middlewares/checkAuth';
import { orderValidator } from '@src/utils/validators/order.validator';
const router = Router();

router.post(
    '/',
    authentication,
    orderValidator.createOrder,
    asyncHandler(orderController.createOrder)
);

export default router;
