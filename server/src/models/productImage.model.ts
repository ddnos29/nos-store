import mongoose, { Schema, Document } from 'mongoose';

export interface IProductImage extends Document {
    product_id: Schema.Types.ObjectId;
    image_name: string;
    image_url: string;
    delete_url: string;
}

const ProductImageSchema: Schema = new Schema(
    {
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        image_name: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        delete_url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ProductImage = mongoose.model<IProductImage>('ProductImage', ProductImageSchema);
