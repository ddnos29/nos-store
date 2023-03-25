import mongoose, { Schema, Document } from 'mongoose';

export interface IProductOption extends Document {
    product_id: Schema.Types.ObjectId;
    size: string;
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
        },
        color: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ProductOption = mongoose.model<IProductOption>('ProductOption', ProductOptionSchema);
