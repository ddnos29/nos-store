import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authentication, asyncHandler } from '../middlewares/checkAuth';
import { authValidator } from '../utils/validators/auth.validator';
const router = Router();

router.post('/login', authValidator.login, asyncHandler(authController.login));

router.post('/cookie', authValidator.login, (req, res) => {
    res.cookie('test3', 'test3', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json('test');
});

router.post(
    '/register',
    authValidator.register,
    asyncHandler(authController.register)
);

router.post('/refresh-token', asyncHandler(authController.refreshToken));

router.delete(
    '/logout',
    /* authentication, */ asyncHandler(authController.logout)
);

export default router;
