import { validationResult } from 'express-validator';

import { BadRequestError } from '../exceptions/error.response';
import { SuccessResponse } from '../exceptions/success.response';
import { brandServices } from '../services/brand.service';
export const brandController = {
    createBrand: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Thêm thương hiệu mới thành công',
                data: await brandServices.createBrand(req.body),
                statusCode: 201,
            }).send(res);
        }
    },

    updateBrand: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Cập nhật thương hiệu thành công',
                data: await brandServices.updateBrand(req.params.id, req.body),
            }).send(res);
        }
    },

    deleteBrand: async (req, res) => {
        new SuccessResponse({
            message: 'Xóa thương hiệu thành công',
            data: await brandServices.deleteBrand(req.params.id),
        }).send(res);
    },

    getAllBrand: async (req, res) => {
        new SuccessResponse({
            message: 'Lấy danh sách thương hiệu thành công',
            data: await brandServices.getAllBrand(),
        }).send(res);
    },
};
