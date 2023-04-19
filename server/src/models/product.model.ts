import { model, Schema, Document, Types } from 'mongoose';

import { GENDER } from '@src/constants/enum';
import { removeVietnameseTones } from '../utils/removeVietnameseTones';

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    images: Array<Types.ObjectId>;
    options: Array<Types.ObjectId>;
    category: Types.ObjectId;
    brand: Types.ObjectId;
    slug: string;
    gender: string;
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
        gender: {
            type: String,
            default: GENDER.GENERAL,
            enum: Object.values(GENDER),
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

/* ProductSchema.pre('find', function () {
    this.getQuery().slug = removeVietnameseTones(this.getQuery().name);
}); */

ProductSchema.pre('save', function (next) {
    this.slug = removeVietnameseTones(this.name) + '-' + this._id;
    next();
});

export const ProductModel = model<IProduct>('Product', ProductSchema);
