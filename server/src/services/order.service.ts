import { OrderModel } from 'src/models/order.model';
import { OrderDetailModel } from '../models/orderDetail.model';

import { ProductModel } from '../models/product.model';

import { PAYMENTSTATUS } from '../constants/enum';

export const orderService = {
    createOrder: async (
        userId,
        {
            products,
            phone,
            address,
            shipping_fee = 15000,
            coupon = '',
            paymentStatus,
            paymentType,
        }
    ) => {
        const total_price = products.reduce((total, product) => {
            return total + product.price * product.quantity;
        });
        const total_quantity = products.reduce((total, product) => {
            return total + product.quantity;
        });

        const order_detail_lst: any[] = [];

        const order = await OrderModel.create({
            user_id: userId,
            total: total_price,
            address,
            phone,
            shipping_fee,
            coupon,
            paymentStatus,
            paymentType,
        });

        for (let i = 0; i < products.length; i++) {
            const order_detail = await OrderDetailModel.create({
                order_id: order._id,
                product_id: products[i]._id,
                quantity: products[i].quantity,
                product_option_id: products[i].product_option_id,
                price: products[i].price,
                size: products[i].size,
                color: products[i].color,
            });
            await order_detail_lst.push(order_detail);
        }

        order.orderDetail = await order_detail_lst.map(
            (order_detail) => order_detail._id
        );
        await order.save();
        await OrderDetailModel.insertMany(order_detail_lst);

        return order;
    },
    updateOrder: async (order) => {},
    deleteOrder: async (order) => {},
    getAllOrder: async () => {},
    getOrderById: async (id) => {},
};
