import { model, Schema, Types, Document } from 'mongoose';

export interface IToken extends Document {
    userId: Types.ObjectId;
    refreshToken: string;
}

const TokenSchema: Schema<IToken> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const TokenModel = model<IToken>('Token', TokenSchema);
