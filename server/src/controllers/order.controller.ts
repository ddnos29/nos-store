import { validationResult } from 'express-validator';

import { BadRequestError } from '@src/exceptions/error.response';
import { SuccessResponse } from '@src/exceptions/success.response';

import { orderService } from '@src/services/order.service';

export const orderController = {
    createOrder: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Tạo đơn hàng thành công',
                data: await orderService.createOrder(req.user.userId, req.body),
                statusCode: 201,
            }).send(res);
        }
    },
    getOrder: async (req, res) => {},
    updateOrder: async (req, res) => {},
};
