import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authentication, asyncHandler } from '../middlewares/checkAuth';
import { authValidator } from '../utils/validators/auth.validator';
const router = Router();

router.post('/login', authValidator.login, asyncHandler(authController.login));

router.post('/register', authValidator.register, asyncHandler(authController.register));

router.get('/refresh-token', asyncHandler(authController.refreshToken));

router.get('/logout', authentication, asyncHandler(authController.logout));

export default router;
