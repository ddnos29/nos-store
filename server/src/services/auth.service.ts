import jwt from 'jsonwebtoken';
import { ITokenPayload } from 'utils/jwt';
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from 'utils/jwt';
import User from 'models/user.model';
import { UserLogin, UserRegister } from 'types/types';

export const authServices = {
    login: async (email: string, password: string) => {},

    register: async (userRegister: UserRegister) => {
        try {
            const user = await User.create(userRegister);
            return user;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async (token: string) => {
        try {
            const payload = await verifyRefreshToken(token);
            const user = await User.findById(payload.userId);
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
            const user = await User.findById(payload.userId);
            if (!user) throw new Error('User not found');

            await user.save();
            return true;
        } catch (error) {
            throw error;
        }
    },
};
