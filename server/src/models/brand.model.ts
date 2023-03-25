import mongoose, { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
	name: string;
	slug: string;
}

const BrandSchema: Schema = new Schema({
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

export default mongoose.model<IBrand>('Brand', BrandSchema);