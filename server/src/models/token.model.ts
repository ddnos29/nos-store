import { model, Schema, Types, Document } from 'mongoose';

export interface IToken extends Document {
    user: Types.ObjectId;
    refreshTokenUsed: Array<string>;
    refreshToken: string;
}

const TokenSchema: Schema<IToken> = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        refreshTokenUsed: {
            type: [String],
            default: [],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const TokenModel = model<IToken>('Token', TokenSchema);
