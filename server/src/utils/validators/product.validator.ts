import { check } from 'express-validator';
import { CategoryModel } from '../../models/category.model';
import { BrandModel } from '../../models/brand.model';

export const productValidator = {
    createProduct: [
        check('name', 'Tên sản phẩm không được để trống').notEmpty(),
        check('price', 'Giá sản phẩm không được để trống').notEmpty(),
        check('description', 'Mô tả sản phẩm không được để trống').notEmpty(),
        check('options')
            .exists()
            .withMessage('Vui lòng thêm tùy chọn sản phẩm')
            .custom((raw) => {
                console.log(raw);
                const value = JSON.parse(JSON.stringify(raw));
                console.log(value);
                if (value.length === 0) {
                    throw new Error('Tùy chọn sản phẩm không được để trống');
                }
                value.forEach((item) => {
                    if (!item.size || !item.quantity || !item.color) {
                        throw new Error('Vui lòng nhập đầy kiểu sản phẩm (số lượng, màu, kích thước)');
                    }
                    if (item.size === '' || item.quantity === '' || item.color === '') {
                        throw new Error('Vui lòng nhập đầy đủ kiểu sản phẩm (số lượng, màu, kích thước)');
                    }
                    if (item.quantity < 0) {
                        throw new Error('Số lượng sản phẩm không được nhỏ hơn 0');
                    }
                });
                return true;
            }),
        check('category', 'Danh mục sản phẩm không được để trống')
            .notEmpty()
            .isMongoId()
            .withMessage('Danh mục sản phẩm không hợp lệ')
            .custom(async (value) => {
                const foundCategory = await CategoryModel.findById(value);
                if (!foundCategory) {
                    throw new Error('Danh mục sản phẩm không tồn tại');
                }
                return true;
            }),
        check('brand', 'Thương hiệu sản phẩm không được để trống')
            .notEmpty()
            .isMongoId()
            .withMessage('Thương hiệu sản phẩm không hợp lệ')
            .custom(async (value) => {
                const foundBrand = await BrandModel.findById(value);
                if (!foundBrand) {
                    throw new Error('Thương hiệu sản phẩm không tồn tại');
                }
                return true;
            }),
    ],

    updateProduct: [
        check('name', 'Tên sản phẩm không được để trống').notEmpty(),
        check('price', 'Giá sản phẩm không được để trống').notEmpty(),
        check('description', 'Mô tả sản phẩm không được để trống').notEmpty(),
        check('options')
            .exists()
            .withMessage('Vui lòng thêm tùy chọn sản phẩm')
            .custom((raw) => {
                console.log(raw);
                const value = JSON.parse(JSON.stringify(raw));
                console.log(value);
                if (value.length === 0) {
                    throw new Error('Tùy chọn sản phẩm không được để trống');
                }
                value.forEach((item) => {
                    if (!item.size || !item.quantity || !item.color) {
                        throw new Error('Vui lòng nhập đầy kiểu sản phẩm (số lượng, màu, kích thước)');
                    }
                    if (item.size === '' || item.quantity === '' || item.color === '') {
                        throw new Error('Vui lòng nhập đầy đủ kiểu sản phẩm (số lượng, màu, kích thước)');
                    }
                    if (item.quantity < 0) {
                        throw new Error('Số lượng sản phẩm không được nhỏ hơn 0');
                    }
                });
                return true;
            }),
        check('category', 'Danh mục sản phẩm không được để trống')
            .notEmpty()
            .isMongoId()
            .withMessage('Danh mục sản phẩm không hợp lệ')
            .custom(async (value) => {
                const foundCategory = await CategoryModel.findById(value);
                if (!foundCategory) {
                    throw new Error('Danh mục sản phẩm không tồn tại');
                }
                return true;
            }),
        check('brand', 'Thương hiệu sản phẩm không được để trống')
            .notEmpty()
            .isMongoId()
            .withMessage('Thương hiệu sản phẩm không hợp lệ')
            .custom(async (value) => {
                const foundBrand = await BrandModel.findById(value);
                if (!foundBrand) {
                    throw new Error('Thương hiệu sản phẩm không tồn tại');
                }
                return true;
            }),
    ],  
};
