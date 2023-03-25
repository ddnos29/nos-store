import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    provine_id: number;
    district_id: number;
    ward_id: number;
    address: string;
    avatar: string;
    refeshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            length: 10,
        },
        provine_id: {
            type: Number,
            required: true,
        },
        district_id: {
            type: Number,
            required: true,
        },
        ward_id: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        refeshToken: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<IUser>('User', UserSchema);