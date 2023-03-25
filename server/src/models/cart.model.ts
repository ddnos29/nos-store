import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
    user_id: Schema.Types.ObjectId;
    product_id: Schema.Types.ObjectId;
    product_option_id: Schema.Types.ObjectId;
    quantity: number;
    color: string;
    size: string;
    price: number;
}

const CartSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
        color: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
