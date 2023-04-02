import { OrderModel } from 'src/models/order.model';
import { OrderDetailModel } from '../models/orderDetail.model';
import { PAYMENTSTATUS, PAYMEMTTYPE } from '../constants/enum';

import { ProductModel } from '../models/product.model';
import { BadRequestError } from '../exceptions/error.response';
export const orderService = {
    createOrder: async (
        userId,
        {
            products,
            phone,
            address,
            shipping_fee = 15000,
            coupon = '',
            paymentType,
        }
    ) => {
        let total_price = 0;

        for (let i = 0; i < products.length; i++) {
            const foundProduct = await ProductModel.findById(products[i]._id);
            if (!foundProduct) throw new BadRequestError('Product not found');
            total_price += foundProduct.price * products[i].quantity;
        }

        const total_quantity = products.reduce((total, product) => {
            return total + product.quantity;
        });

        const order_detail_lst: any[] = [];

        const order = await new OrderModel({
            user_id: userId,
            total: total_price,
            address,
            phone,
            shipping_fee,
            coupon,
            paymentType: PAYMEMTTYPE[paymentType],
        });

        for (let i = 0; i < products.length; i++) {
            const order_detail = await new OrderDetailModel({
                order_id: order._id,
                product_id: products[i]._id,
                quantity: products[i].quantity,
                product_option_id: products[i].product_option_id,
            });
            await order_detail_lst.push(order_detail);
        }

        order.orderDetail = await order_detail_lst.map(
            (order_detail) => order_detail._id
        );

        await OrderDetailModel.insertMany(order_detail_lst);
        await order.save();

        return order;
    },
    updateOrder: async (order) => {},
    deleteOrder: async (order) => {},
    getAllOrder: async () => {},
    getOrderById: async (id) => {},
    getOrderByUserId: async (userId) => {
        const orders = await OrderModel.find({ user_id: userId });

        return orders;
    },
};
