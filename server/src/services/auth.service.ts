import bcrypt from 'bcrypt';

import { signAccessToken, signRefreshToken } from '../utils/jwt';
import {
    AuthFailureError,
    BadRequestError,
    NotFoundError,
} from '../exceptions/error.response';
//import { UserLogin, UserRegister } from '../types/types';

import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';

import { tokenService } from './token.service';

export interface UserLogin {
    email: string;
    password: string;
    refreshToken?: string;
}

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

export const authServices = {
    login: async ({ email, password }: UserLogin, { refreshToken }: any) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) throw new BadRequestError('Không tìm thấy tài khoản');

            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new AuthFailureError('Mật khẩu không chính xác');
            //Create access token
            const accessToken = await signAccessToken({
                userId: user._id,
                name: user.name,
                role: user.role,
            });
            //Create refresh token
            const newRefreshToken = await signRefreshToken({
                userId: user._id,
            });

            //Save refresh token to database
            await tokenService.createToken({
                userId: user._id,
                refreshToken: newRefreshToken,
            });

            if (refreshToken) {
                const tokenStore = await TokenModel.findOne({ user: user._id });
                if (!tokenStore) throw new NotFoundError('Token not found');
                tokenStore.refreshTokenUsed.push(refreshToken);
                await tokenStore.save();
            }

            return {
                user,
                access_token: accessToken,
                refresh_token: newRefreshToken,
            };
        } catch (error) {
            throw error;
        }
    },

    register: async ({
        email,
        password,
        name,
        phone,
        address,
    }: UserRegister) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({
                email,
                password: hashedPassword,
                name,
                phone,
                address,
            });
            return user;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async ({ refreshToken }) => {
        if (!refreshToken) {
            throw new Error('Refresh token not found');
        }

        const foundTokenUse = await TokenModel.findOne({ refreshToken }).lean();
    },

    logout: async (refreshToken) => {
        if (refreshToken) {
            const delToken = await TokenModel.findOne({ refreshToken });
            if (!delToken) {
                throw new AuthFailureError('Vui lòng đăng nhập lại');
            }
            delToken.refreshTokenUsed.push(delToken.refreshToken);
            delToken.refreshToken = '';
            await delToken.save();
            return delToken;
        }
    },
};
