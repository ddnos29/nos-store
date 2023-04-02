import { check, param } from 'express-validator';
import { CategoryModel } from '../../models/category.model';

export const categoryValidator = {
    create: [check('name', 'Tên danh mục không được để trống').notEmpty()],
    update: [
        check('name', 'Tên danh mục không được để trống').notEmpty(),
        check('id', 'Không tìm thấy id danh mục').notEmpty(),
    ],
    checkParamId: [
        param('id')
            .notEmpty()
            .withMessage('Vui lòng truyền id danh mục')
            .isMongoId()
            .withMessage('Id danh mục giá không hợp lệ')
            .custom(async (id) => {
                const found = await CategoryModel.findById(id);
                if (!found) {
                    throw new Error('Id danh mục giá không tồn tại');
                }
                return true;
            }),
    ],
};
