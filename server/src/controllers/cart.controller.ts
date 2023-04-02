import { validationResult } from 'express-validator';

import { BadRequestError } from '@src/exceptions/error.response';
import { SuccessResponse } from '@src/exceptions/success.response';

import { cartService } from '@src/services/cart.service';

export const cartController = {
    addItemToCart: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Thêm sản phẩm vào giỏ hàng thành công',
                data: await cartService.addToCart(req.user._id, req.body),
                statusCode: 201,
            }).send(res);
        }
    },
    updateCartItem: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Cập nhật sản phẩm trong giỏ hàng thành công',
                data: await cartService.updateCart(
                    req.user._id,
                    req.params.id,
                    req.body
                ),
            }).send(res);
        }
    },
    deleteCartItem: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
                data: await cartService.deleteCart(req.user._id, req.params.id),
            }).send(res);
        }
    },
    getCart: async (req, res) => {
        new SuccessResponse({
            message: 'Lấy danh sách sản phẩm trong giỏ hàng thành công',
            data: await cartService.getCart(req.user._id),
        }).send(res);
    },
};
