import jwt from 'jsonwebtoken';

import { ROLE } from '../constants/enum';
import { AuthFailureError } from '@src/exceptions/error.response';

export interface ITokenPayload {
    userId: string;
    name?: string;
    role?: ROLE;
}

export const signAccessToken = (payload: ITokenPayload): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        jwt.sign(
            payload,
            `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
            {
                expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION}`,
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};

export const signRefreshToken = (payload: ITokenPayload): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        jwt.sign(
            payload,
            `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
            {
                expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION}`,
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};

export const verifyAccessToken = (token: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        jwt.verify(
            token,
            `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
            (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            }
        );
    });
};

export const verifyRefreshToken = (token: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        jwt.verify(
            token,
            `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
            (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            }
        );
    });
};
