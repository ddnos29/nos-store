import { check, body } from 'express-validator';
import { UserModel } from '@src/models/user.model';
export const authValidator = {
    login: [
        check('email', 'Email không được để trống').notEmpty(),
        check('email', 'Email không đúng định dạng').isEmail(),
        check('password', 'Mật khẩu không được để trống').notEmpty(),
        check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({
            min: 6,
        }),
    ],

    register: [
        check('email', 'Email không được để trống').notEmpty(),
        check('email', 'Email không đúng định dạng')
            .isEmail()
            .custom(async (value) => {
                const foundEmail = await UserModel.findOne({ email: value });
                if (foundEmail) {
                    throw new Error('Email đã tồn tại');
                }
                return true;
            }),
        check('password', 'Mật khẩu không được để trống').notEmpty(),
        check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({
            min: 6,
        }),
        check('name', 'Tên không được để trống').notEmpty(),
        check('phone', 'Số điện thoại không được để trống').notEmpty(),
        check('phone', 'Số điện thoại bắt buộc phải có 10 số').isLength({
            min: 10,
        }),
        check('address', 'Địa chỉ không được để trống').notEmpty(),
    ],
};
