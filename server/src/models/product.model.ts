import mongoose, { Schema, Document } from 'mongoose';

import { IProductImage } from './productImage.model';
import { IProductOption } from './productOption.model';

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    images: IProductImage[];
    option: IProductOption[];
    category_id: Schema.Types.ObjectId;
    brand_id: Schema.Types.ObjectId;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
}

const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: Schema.Types.ObjectId,
            ref: 'ProductImage',
            required: true,
        },
        options: {
            type: Schema.Types.ObjectId,
            ref: 'ProductOption',
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
