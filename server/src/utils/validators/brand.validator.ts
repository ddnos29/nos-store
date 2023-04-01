import { check } from 'express-validator';

export const brandValidator = {
    create: [check('name', 'Tên thương hiệu không được để trống').notEmpty()],
    update: [
        check('name', 'Tên thương hiệu không được để trống').notEmpty(),
        check('id', 'Không tìm thấy id sản phẩm').notEmpty(),
    ],
};
