import { check, param } from 'express-validator';
import { BrandModel } from '../../models/brand.model';
export const brandValidator = {
    create: [check('name', 'Tên thương hiệu không được để trống').notEmpty()],
    update: [
        check('name', 'Tên thương hiệu không được để trống').notEmpty(),
        check('id', 'Không tìm thấy id sản phẩm').notEmpty(),
    ],
    checkParamId: [
        param('id')
            .notEmpty()
            .withMessage('Vui lòng nhập id mã thương hiệu')
            .isMongoId()
            .withMessage('Id mã thương hiệu không hợp lệ')
            .custom(async (id) => {
                const foundBrand = await BrandModel.findById(id);
                if (!foundBrand) {
                    throw new Error('Id mã thương hiệu không tồn tại');
                }
                return true;
            }),
    ],
};
