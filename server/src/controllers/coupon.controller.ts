import { validationResult } from 'express-validator';

import { BadRequestError } from '../exceptions/error.response';
import { SuccessResponse } from '../exceptions/success.response';
import { couponService } from 'src/services/coupon.service';

export const couponController = {
    createCoupon: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Tạo mã giảm giá thành công',
                statusCode: 201,
                data: await couponService.createCoupon(req.body),
            }).send(res);
        }
    },
    updateCoupon: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Cập nhật mã giảm giá thành công',
                data:
                    (await couponService.updateCoupon(
                        req.params.id,
                        req.body
                    )) || {},
            }).send(res);
        }
    },
    deleteCoupon: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Xóa mã giảm giá thành công',
                data: (await couponService.deleteCoupon(req.params.id)) || {},
            }).send(res);
        }
    },
    getAllCoupon: async (req, res) => {
        new SuccessResponse({
            message: 'Lấy danh sách mã giảm giá thành công',
            data: await couponService.getAllCoupon(),
        }).send(res);
    },
    getCouponById: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Lấy mã giảm giá thành công',
                data: (await couponService.getCouponById(req.params.id)) || {},
            }).send(res);
        }
    },

    disabledCoupon: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Khóa mã giảm giá thành công',
                data: (await couponService.disabledCoupon(req.params.id)) || {},
            }).send(res);
        }
    },

    useCoupon: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Sử dụng mã giảm giá thành công',
                data: await couponService.useCoupon(req.params.id),
            }).send(res);
        }
    },
};
