import { categoryServices } from '../services/category.service';
import { SuccessResponse } from '../exceptions/success.response';
import { validationResult } from 'express-validator';

import { BadRequestError } from '../exceptions/error.response';

export const categoryController = {
    createCategory: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Thêm danh mục mới thành công',
                data: await categoryServices.createCategory(req.body),
                statusCode: 201,
            }).send(res);
        }
    },

    updateCategory: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Cập nhật thương hiệu thành công',
                data: await categoryServices.updateCategory(
                    req.params.id,
                    req.body
                ),
            }).send(res);
        }
    },

    deleteCategory: async (req, res) => {
        new SuccessResponse({
            message: 'Xóa thương hiệu thành công',
            data: await categoryServices.deleteCategory(req.params.id),
        }).send(res);
    },

    getAllCategory: async (req, res) => {
        new SuccessResponse({
            message: 'Lấy danh sách thương hiệu thành công',
            data: await categoryServices.getAllCategory(),
        }).send(res);
    },
};
