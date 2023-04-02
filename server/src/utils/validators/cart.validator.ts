import { check, param } from 'express-validator';
import { ProductModel } from '@src/models/product.model';
import { ProductOptionModel } from '@src/models/productOption.model';
export const cartValidator = {
    addItemToCart: [
        check('product_id', 'Thiếu mã sản phẩm')
            .notEmpty()
            .isMongoId()
            .withMessage('Mã sản phẩm không hợp lệ')
            .custom(async (product_id) => {
                const foundProduct = await ProductModel.findOne({
                    _id: product_id,
                    status: true,
                });
                if (!foundProduct) {
                    throw new Error('Không tìm thấy sản phẩm');
                }
                return true;
            }),
        check('option_id', 'Vui lòng chọn option sản phẩm')
            .notEmpty()
            .isMongoId()
            .withMessage('Mã option sản phẩm không hợp lệ')
            .custom(async (option_id) => {
                const foundOption = await ProductOptionModel.findById(
                    option_id
                );

                if (!foundOption) {
                    throw new Error('Không tìm thấy option sản phẩm');
                }
                return true;
            }),
    ],

    updateCartItem: [
        param('id')
            .notEmpty()
            .withMessage('Vui lòng nhập id giỏ hàng')
            .isMongoId()
            .withMessage('Id giỏ hàng không hợp lệ'),
        check('quantity', 'Vui lòng nhập số lượng sản phẩm')
            .notEmpty()
            .isInt({ min: 1 })
            .withMessage('Số lượng sản phẩm tối thiểu là 1 hợp lệ'),
    ],
    deleteCartItem: [
        param('id')
            .notEmpty()
            .withMessage('Vui lòng nhập id giỏ hàng')
            .isMongoId()
            .withMessage('Id giỏ hàng không hợp lệ'),
    ],
};
