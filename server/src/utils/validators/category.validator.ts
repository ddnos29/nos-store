import { check } from 'express-validator';

export const categoryValidator = {
    create: [check('name', 'Tên danh mục không được để trống').notEmpty()],
    update: [
        check('name', 'Tên danh mục không được để trống').notEmpty(),
        check('id', 'Không tìm thấy id danh mục').notEmpty(),
    ],
};
