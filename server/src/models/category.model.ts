import { model, Schema, Document } from 'mongoose';

import { removeVietnameseTones } from '../utils/removeVietnameseTones';

export interface ICategory extends Document {
    name: string;
    slug: string;
}

const CategorySchema: Schema<ICategory> = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        default: '',
    },
});

CategorySchema.pre('save', function (next) {
    this.slug = removeVietnameseTones(this.name);
    next();
});

export const CategoryModel = model<ICategory>('Category', CategorySchema);
