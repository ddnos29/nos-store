import bcrypt from 'bcrypt';

import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../utils/jwt';
import { AuthFailureError, BadRequestError } from '../exceptions/error.response';
import { UserLogin, UserRegister } from '../types/types';
import { ITokenPayload } from '../utils/jwt';

import { UserModel, IUser } from '../models/user.model';

export const authServices = {
    login: async ({ email, password }: UserLogin) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) throw new BadRequestError('Không tìm thấy tài khoản');
            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new AuthFailureError('Mật khẩu không chính xác');
            const accessToken = await signAccessToken({
                userId: user._id,
                name: user.name,
                role: user.role,
            });

            const refreshToken = await signRefreshToken({
                userId: user._id,
            });

            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    },

    register: async (email: string, password: string, name: string, phone: string, address: string) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ email, password: hashedPassword, name, phone, address });

            return user;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async (token: string) => {
        try {
            const payload = await verifyRefreshToken(token);
            const user = await UserModel.findById(payload.userId);
            if (!user) throw new Error('User not found');
            const accessToken = await signAccessToken({
                userId: user._id,
                name: user.name,
                role: user.role,
            });
            const refreshToken = await signRefreshToken({
                userId: user._id,
                name: user.name,
                role: user.role,
            });
            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    },

    logout: async (token: string) => {
        try {
            const payload = await verifyRefreshToken(token);
            const user = await UserModel.findById(payload.userId);
            if (!user) throw new Error('User not found');

            await user.save();
            return true;
        } catch (error) {
            throw error;
        }
    },
};
