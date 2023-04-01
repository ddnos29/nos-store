import { model, Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
    name: string;
    code: string;
    percent: number;
    amount: number;
    expireDate: Date;
    status: boolean;
}

const CouponSchema: Schema<ICoupon> = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: 'Mã giảm giá',
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        percent: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 100,
        },
        amount: {
            type: Number,
            required: true,
            default: 1000,
            min: 0,
        },
        status: {
            type: Boolean,
            default: true,
        },
        expireDate: {
            type: Date,
            required: true,
            default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), // exprire in 7 days
        },
    },
    {
        timestamps: true,
    }
);

export const CouponModel = model<ICoupon>('Coupon', CouponSchema);
