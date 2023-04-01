import { ProductModel } from '../models/product.model';
import { ProductOptionModel } from '../models/productOption.model';
import { ProductImageModel } from '../models/productImage.model';
import { BadRequestError } from '../exceptions/error.response';

import { uploadImage } from '../utils/uploadImage';
import { SIZE } from '../constants/enum';

export const productServices = {
    createProduct: async (
        { name, price, description, options, category, brand },
        files
    ) => {
        const foundProduct = await ProductModel.findOne(
            { name },
            { status: true }
        );
        if (foundProduct) {
            throw new BadRequestError('Sản phẩm đã tồn tại');
        }

        const listImages: any[] = [];
        const listOptions: any[] = [];

        const product = new ProductModel({
            name,
            price,
            description,
            category,
            brand,
        });
        console.log(options);
        for (let i = 0; i < options.length; i++) {
            // check size
            if (!Object.values(SIZE).includes(options[i].size)) {
                throw new BadRequestError('Size không hợp lệ');
            }

            const productOption = await new ProductOptionModel({
                product_id: product._id,
                size: options[i].size,
                color: options[i].color,
                quantity: options[i].quantity,
            });

            await listOptions.push(productOption);
        }
        for (let i = 0; i < files.length; i++) {
            const data = await uploadImage(files[i]);

            const productImage = await new ProductImageModel({
                product_id: product._id,
                image_name: data.image_name,
                image_url: data.image_url,
                delete_url: data.delete_url,
            });

            await listImages.push(productImage);
        }
        product.images = listImages.map((image) => image._id);
        product.options = listOptions.map((option) => option._id);

        await ProductOptionModel.insertMany(listOptions);
        await ProductImageModel.insertMany(listImages);
        await product.save();

        return product;
    },
    updateProduct: async (
        id,
        { name, price, description, options, category, brand },
        files
    ) => {
        const product = await ProductModel.findOne({ _id: id, status: true });
        if (!product) {
            throw new BadRequestError('Sản phẩm không tồn tại');
        }

        const foundProduct = await ProductModel.findOne({ name });
        if (foundProduct && foundProduct._id != id) {
            throw new BadRequestError('Tên phẩm đã tồn tại');
        }

        const listImages: any[] = [];
        const listOptions: any[] = [];

        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.brand = brand;

        for (let i = 0; i < options.length; i++) {
            // check size
            if (!Object.values(SIZE).includes(options[i].size)) {
                throw new BadRequestError('Size không hợp lệ');
            }

            const productOption = await new ProductOptionModel({
                product_id: product._id,
                size: options[i].size,
                color: options[i].color,
                quantity: options[i].quantity,
            });

            await listOptions.push(productOption);
        }
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const data = await uploadImage(files[i]);

                const productImage = await new ProductImageModel({
                    product_id: product._id,
                    image_name: data.image_name,
                    image_url: data.image_url,
                    delete_url: data.delete_url,
                });

                await listImages.push(productImage);
            }
            product.images = listImages.map((image) => image._id);
            await ProductImageModel.insertMany(listImages);
        }

        product.options = listOptions.map((option) => option._id);

        await ProductOptionModel.insertMany(listOptions);
        await product.save();

        return product;
    },
    deleteProduct: async (id) => {
        const product = await ProductModel.findOne({ _id: id, status: true });
        if (!product) {
            throw new BadRequestError('Sản phẩm không tồn tại');
        }
        product.status = false;
        await product.save();
        return product;
    },
    getAllProducts: async () => {
        return await ProductModel.find({ status: true })
            .populate('category')
            .populate('brand')
            .populate([
                {
                    path: 'images',
                    model: 'ProductImage',
                },
            ])
            .populate([
                {
                    path: 'options',
                    model: 'ProductOption',
                },
            ])
            .lean();
    },

    getProductById: async (id) => {
        const product = await ProductModel.findOne({ _id: id, status: true })
            .populate('category')
            .populate('brand')
            .populate([
                {
                    path: 'images',
                    model: 'ProductImage',
                },
            ])
            .populate([
                {
                    path: 'options',
                    model: 'ProductOption',
                },
            ])
            .lean();

        return product;
    },

    getProductByCategoryId: async (id) => {},
    getProductByBrandId: async (id) => {},
    getProuctByName: async (name) => {},
};
