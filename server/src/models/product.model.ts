import { model, Schema, Document, Types } from 'mongoose';

import { IProductImage, ProductImageModel } from './productImage.model';
import { IProductOption, ProductOptionModel } from './productOption.model';

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    images: [Types.ObjectId] | IProductImage[];
    options: [Types.ObjectId] | IProductOption[];
    category: Types.ObjectId;
    brand: Types.ObjectId;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    rating: number;
}

const ProductSchema: Schema<IProduct> = new Schema(
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
        images: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductImage',
                required: true,
            },
        ],
        options: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProductOption',
                required: true,
            },
        ],
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
            default: '',
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
        rating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const ProductModel = model<IProduct>('Product', ProductSchema);
