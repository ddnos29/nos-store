import { Router } from 'express';

import { cartController } from '@src/controllers/cart.controller';
import { cartValidator } from '@src/utils/validators/cart.validator';
import { authentication, asyncHandler } from '@src/middlewares/checkAuth';

const router = Router();

router.use(authentication);

router.get('/', asyncHandler(cartController.getCart));

router.post(
    '/',
    cartValidator.addItemToCart,
    asyncHandler(cartController.addItemToCart)
);

router.put(
    '/:id',
    cartValidator.updateCartItem,
    asyncHandler(cartController.updateCartItem)
);

router.delete(
    '/:id',
    cartValidator.deleteCartItem,
    asyncHandler(cartController.deleteCartItem)
);

export default router;
