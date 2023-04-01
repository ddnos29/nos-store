import { validationResult } from 'express-validator';

import { BadRequestError } from '../exceptions/error.response';
import { SuccessResponse } from '../exceptions/success.response';
import { productServices } from '../services/product.service';

export const productController = {
    createProduct: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Thêm sản phẩm mới thành công',
                data: await productServices.createProduct(
                    JSON.parse(JSON.stringify(req.body)),
                    req.files
                ),
                statusCode: 201,
            }).send(res);
        }
    },

    updateProduct: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Cập nhật sản phẩm thành công',
                data: await productServices.updateProduct(
                    req.params.id,
                    JSON.parse(JSON.stringify(req.body)),
                    req.files
                ),
            }).send(res);
        }
    },
    deleteProduct: async (req, res) => {
        new SuccessResponse({
            message: 'Xóa sản phẩm thành công',
            data: await productServices.deleteProduct(req.params.id),
        }).send(res);
    },
    getProductById: async (req, res) => {
        new SuccessResponse({
            message: 'Chi tiết sản phẩm',
            data: (await productServices.getProductById(req.params.id)) || {},
        }).send(res);
    },
    getAllProducts: async (req, res) => {
        new SuccessResponse({
            message: 'Danh sách sản phẩm',
            data: await productServices.getAllProducts(),
        }).send(res);
    },
};
