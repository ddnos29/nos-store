import mongoose, { Schema, Document } from 'mongoose';

import { removeVietnameseTones } from '../utils/removeVietnameseTones';

export interface ICategory extends Document {
    name: string;
    slug: string;
}

const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        default: '',
    },
});

CategorySchema.pre('save', function (next) {
    this.slug = removeVietnameseTones(this.name);
    next();
});

export default mongoose.model<ICategory>('Category', CategorySchema);
