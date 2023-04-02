import { check, param } from 'express-validator';
import { ProductModel } from '@src/models/product.model';
import { Types } from 'mongoose';
export const orderValidator = {
    createOrder: [
        check('phone', 'Số điện thoại không hợp lệ').isLength({
            min: 10,
            max: 10,
        }),

        check('address', 'Địa chỉ không được để trống').notEmpty(),

        check('paymentType', 'Phương thức thanh toán không hợp lệ').isIn([
            'COD',
            'TRANSFER',
        ]),

        check('products')
            .isArray()
            .withMessage('Danh sách sản phẩm không hợp lệ')
            .custom(async (products) => {
                for (let i = 0; i < products.length; i++) {
                    const foundProduct = await ProductModel.findOne({
                        _id: products[i]._id,
                        status: true,
                    });
                    if (!foundProduct) {
                        throw new Error('Sản phẩm không tồn tại');
                    }

                    const foundOption = foundProduct.options.includes(
                        new Types.ObjectId(products[i].product_option_id)
                    );

                    if (!foundOption) {
                        throw new Error('Option sản phẩm không tồn tại');
                    }

                    if (products[i].quantity < 0) {
                        throw new Error(
                            `Số lượng sản phẩm ${foundProduct.name} có size ${foundOption} phải lớn hớn 0`
                        );
                    }
                }
            }),
    ],
};
