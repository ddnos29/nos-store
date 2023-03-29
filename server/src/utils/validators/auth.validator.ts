const { check, body } = require('express-validator');

import User from '../../models/user.model';

export const authValidator = {
    login: [
        check('email', 'Email không được để trống').notEmpty(),
        check('email', 'Email không đúng định dạng').isEmail(),
        check('password', 'Mật khẩu không được để trống').notEmpty(),
        check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({ min: 6 }),
    ],

    register: [
        check('email', 'Email không được để trống').notEmpty(),
        check('email', 'Email không đúng định dạng').isEmail(),
        check('password', 'Mật khẩu không được để trống').notEmpty(),
        check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({ min: 6 }),
        check('name', 'Tên không được để trống').notEmpty(),
        check('phone', 'Số điện thoại không được để trống').notEmpty(),
        check('phone', 'Số điện thoại bắt buộc phải có 10 số').isLength({ min: 10 }),
        check('address', 'Địa chỉ không được để trống').notEmpty(),

        body('email').custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('Email đã tồn tại');
            }
            return true;
        }),
    ],
};
