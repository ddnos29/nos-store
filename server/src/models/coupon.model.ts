import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
    name: string;
    code: string;
    percent: number;
    amount: number;
    expireDate: Date;
    status: boolean;
}

const CouponSchema: Schema = new Schema(
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
            default: 0,
            min: 0,
            max: 100,
        },
        amount: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        expireDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ICoupon>('Coupon', CouponSchema);
