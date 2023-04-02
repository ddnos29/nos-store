import { model, Document, Schema, Types } from 'mongoose';

import { IOrderDetail } from './orderDetail.model';

import { ORDERSTATUS } from '../constants/enum';
import { PAYMENTSTATUS } from '../constants/enum';
import { PAYMEMTTYPE } from '../constants/enum';

export interface IOrder extends Document {
    user_id: Types.ObjectId;
    phone: string;
    provine_id?: number;
    district_id?: number;
    ward_id?: number;
    address: string;
    status: ORDERSTATUS;
    shippingfee?: number;
    paymentStatus: PAYMENTSTATUS;
    paymentType: PAYMEMTTYPE;
    coupon?: string;
    total: number;
    orderDetail: IOrderDetail[] | Types.ObjectId;
    createAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
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
        },
        district_id: {
            type: Number,
        },
        ward_id: {
            type: Number,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: ORDERSTATUS.PENDING,
            enum: Object.values(ORDERSTATUS),
        },
        paymentStatus: {
            type: String,
            default: PAYMENTSTATUS.UNPAID,
            enum: Object.values(PAYMENTSTATUS),
        },
        paymentType: {
            type: String,
            default: PAYMEMTTYPE.COD,
            enum: Object.values(PAYMEMTTYPE),
        },
        shippingfee: {
            type: Number,
            default: 0,
        },
        coupon: {
            type: String,
            default: '',
        },
        total: {
            type: Number,
            required: true,
        },
        createAt: {
            type: Date,
            default: Date.now,
        },
        orderDetail: [{ type: Schema.Types.ObjectId, ref: 'OrderDetail' }],
    },
    {
        timestamps: true,
    }
);

export const OrderModel = model<IOrder>('Order', OrderSchema);
