import { CartModel } from '../models/cart.model';

import { BadRequestError } from '../exceptions/error.response';

export const cartService = {
    addToCart: async (user_id, { product_id, product_option_id }) => {
        const foundCart = await CartModel.findOne({
            user_id,
            product_id,
            product_option_id,
        });

        if (foundCart) {
            foundCart.quantity += 1;
            await foundCart.save();
            return foundCart;
        } else {
            const cart = await CartModel.create({
                user_id,
                product_id,
                product_option_id,
            });

            cart.save();
            return cart;
        }
    },
    updateCart: async (user_id, id, { quantity }) => {
        const foundCart = await CartModel.findOne({
            user_id,
            _id: id,
        });

        if (!foundCart) {
            throw new BadRequestError('Không tìm thấy sản phẩm trong giỏ hàng');
        }

        foundCart.quantity = quantity;
        await foundCart.save();
        return foundCart;
    },
    deleteCart: async (user_id, id) => {
        const foundCart = await CartModel.findOneAndDelete({
            user_id,
            _id: id,
        });

        if (!foundCart) {
            throw new BadRequestError('Không tìm thấy sản phẩm trong giỏ hàng');
        }

        return foundCart;
    },
    getCart: async (userId) => {
        const cart = await CartModel.find({ user_id: userId })
            .populate({
                path: 'product_id',
                model: 'Product',
                match: { status: true },
                select: 'name price',
                populate: {
                    path: 'images',
                    model: 'ProductImage',
                    select: 'image_url',
                },
            })
            .populate({
                path: 'product_option_id',
                model: 'ProductOption',
                select: 'size color',
            });

        return cart;
    },
};
