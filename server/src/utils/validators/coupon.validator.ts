import { check, param } from 'express-validator';
import { CouponModel } from '../../models/coupon.model';

export const couponValidator = {
    createCoupon: [
        check('name').notEmpty().withMessage('Vui lòng nhập tên mã giảm giá'),
        check('code').notEmpty().withMessage('Vui lòng nhập mã giảm giá'),
        check('code').custom(async (code) => {
            const foundCode = await CouponModel.findOne({ code });
            if (foundCode) {
                throw new Error('Code mã giảm giá đã tồn tại');
            }
            return true;
        }),
        check('percent')
            .isInt({ min: 1, max: 100 })
            .withMessage('Phần trăm giảm giá phải từ 1% đến 100%'),
        check('aSố lượng mã giảm giá phải lớn hơn 0'),
        check('expireDate')
            .notEmpty()
            .withMessage('Vui lòng nhập ngày hết hạn')
            .isDate()
            .withMessage('Ngày hết hạn không hợp lệ')
            .isAfter()
            .withMessage('Ngày hết hạn phải lớn hơn ngày hiện tại'),
    ],
    updateCoupon: [
        param('id')
            .notEmpty()
            .withMessage('Vui lòng nhập id mã giảm giá')
            .isMongoId()
            .withMessage('Id mã giảm giá không hợp lệ')
            .custom(async (id) => {
                const foundCoupon = await CouponModel.findById(id);
                if (!foundCoupon) {
                    throw new Error('Mã giảm giá không tồn tại');
                }
                return true;
            }),
        check('name').notEmpty().withMessage('Vui lòng nhập tên mã giảm giá'),
        // check('code').notEmpty().withMessage('Vui lòng nhập mã giảm giá'),
       /*  check('code').custom(async (code,{req}) => {
            const foundCode = await CouponModel.findOne({ code });
            if (foundCode && foundCode._id != id) {
                throw new Error('Code mã giảm giá đã tồn tại');
            }
            return true;
        }), */
        check('percent')
            .isInt({ min: 1, max: 100 })
            .withMessage('Phần trăm giảm giá phải từ 1% đến 100%'),
        check('aSố lượng mã giảm giá phải lớn hơn 0'),
        check('expireDate')
            .notEmpty()
            .withMessage('Vui lòng nhập ngày hết hạn')
            .isDate()
            .withMessage('Ngày hết hạn không hợp lệ')
            .isAfter()
            .withMessage('Ngày hết hạn phải lớn hơn ngày hiện tại'),
    ],
    checkParamId: [
        param('id')
            .notEmpty()
            .withMessage('Vui lòng nhập id mã giảm giá')
            .isMongoId()
            .withMessage('Id mã giảm giá không hợp lệ')
            .custom(async (id) => {
                const foundCoupon = await CouponModel.findById(id);
                if (!foundCoupon) {
                    throw new Error('Id mã giảm giá không tồn tại');
                }
                return true;
            }),
    ],
    useCoupon: [
        check('code').notEmpty().withMessage('Vui lòng nhập mã giảm giá'),
        check('code').custom(async (code) => {
            const foundCoupon = await CouponModel.findOne({ code });
            if (!foundCoupon) {
                throw new Error('Mã giảm giá không tồn tại');
            }

            return true;
        }),
    ],
};
