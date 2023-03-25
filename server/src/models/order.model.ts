import mongoose, { Document, Schema } from 'mongoose';

import { IOrderDetail } from './orderDetail.model';

export interface IOrder extends Document {
    user_id: Schema.Types.ObjectId;
    phone: string;
    provine_id?: number;
    district_id?: number;
    ward_id?: number;
    address: string;
    status: string;
    payment: string;
    coupon?: string;
    total: number;
    orderDetails: IOrderDetail[];
    createAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        phone: {
            type: String,
            required: true,
            length: 10,
        },
        provine_id: {
            type: Number,
            required: true,
        },
        district_id: {
            type: Number,
            required: true,
        },
        ward_id: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        payment: {
            type: String,
            required: true,
        },
        coupon: {
            type: String,
        },
        total: {
            type: Number,
            required: true,
        },
        orderDetail: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OrderDetail',
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
