import { model, Schema, Document, Types } from 'mongoose';

import { ROLE } from "constants/Role";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: ROLE;
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

const UserSchema: Schema<IUser> = new Schema(
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
            default: ROLE.CUSTOMER,
            enum: Object.values(ROLE),
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

export default model<IUser>('User', UserSchema);
