import { model, Document, Schema, Types } from 'mongoose';

import { IProduct } from './product.model';
import { IProductOption } from './productOption.model';

export interface ICart extends Document {
    user_id: Types.ObjectId;
    product_id: Types.ObjectId | IProduct;
    product_option_id: Types.ObjectId | IProductOption;
    quantity: number;
    color?: string;
    size?: string;
    price?: number;
}

const CartSchema: Schema<ICart> = new Schema(
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
            min: 1,
            default: 1,
        },
        color: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

export const CartModel = model<ICart>('Cart', CartSchema);
