import { Router } from 'express';
import { test } from '../controllers/test.controller';
import { authentication, asyncHandler } from '../middlewares/checkAuth';
const router = Router();

router.get('/', test);
router.get('/test', authentication, asyncHandler(test));

router.get('/cookie', (req, res) => {
    res.cookie('test', 'test', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json('test');
});

export default router;
