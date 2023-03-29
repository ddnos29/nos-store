import { model, Document, Schema } from 'mongoose';

export interface IBrand extends Document {
    name: string;
    slug: string;
}

const BrandSchema: Schema<IBrand> = new Schema({
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

export const BrandModel = model<IBrand>('Brand', BrandSchema);
