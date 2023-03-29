import { model, Document, Schema, Types } from 'mongoose';

import { IProductOption } from "./productOption.model";

export interface IOrderDetail extends Document {
    order_id: Types.ObjectId;
    product_id: Types.ObjectId;
    product_option_id: Types.ObjectId | IProductOption;
    quantity: number;
    price?: number;
    size?: string;
    color?: string;
}

const OrderDetailSchema: Schema<IOrderDetail> = new Schema(
    {
        order_id: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        product_option_id: {
            type: Schema.Types.ObjectId,
            ref: 'ProductOption',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const OrderDetailModel = model<IOrderDetail>('OrderDetail', OrderDetailSchema);
