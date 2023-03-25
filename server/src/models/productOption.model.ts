import mongoose, { Schema, Document } from 'mongoose';

import { SIZE } from 'constants/Size';

export interface IProductOption extends Document {
    product_id: Schema.Types.ObjectId;
    size: SIZE;
    color: string;
    quantity: number;
}

const ProductOptionSchema: Schema<IProductOption> = new Schema(
    {
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        size: {
            type: String,
            required: true,
            enum: Object.values(SIZE),
        },
        color: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const ProductOption = mongoose.model<IProductOption>('ProductOption', ProductOptionSchema);
