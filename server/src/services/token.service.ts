import { TokenModel } from '../models/token.model';

import { AuthFailureError } from '../exceptions/error.response';

import { verifyRefreshToken, signAccessToken, signRefreshToken } from '../utils/jwt';

import { UserModel } from '../models/user.model';

export const tokenService = {
    createToken: async ({ userId, refreshToken }) => {
        try {
            const filter = {
                    user: userId,
                },
                update = {
                    /* refreshTokenUsed: [], */
                    refreshToken,
                },
                options = {
                    upsert: true,
                    new: true,
                };

            const tokens = await TokenModel.findOneAndUpdate(filter, update, options);

            return tokens;
        } catch (error) {
            return error;
        }
    },

    handleToken: async ({ refreshToken }) => {
        if (!refreshToken) {
            throw new AuthFailureError('Refresh token not found');
        }
        const foundTokenUse = await TokenModel.findOne({ refreshToken });
        if (!foundTokenUse) {
            throw new AuthFailureError('Vui lòng đăng nhập lại');
        }

        const checkTokenUsed = await foundTokenUse.refreshTokenUsed.includes(refreshToken);
        if (checkTokenUsed) {
            throw new AuthFailureError('Some thing went wrong please login again');
        }

        const decoded = await verifyRefreshToken(refreshToken);
        if (!decoded) {
            throw new AuthFailureError('Invalid refresh token');
        }

        const user = await UserModel.findOne({ _id: decoded.userId }).lean();

        if (!user) {
            throw new AuthFailureError('User not found');
        }

        const newAccessToken = await signAccessToken({
            userId: user._id,
            name: user.name,
            role: user.role,
        });

        const newRefreshToken = await signRefreshToken({
            userId: user._id,
        });

        foundTokenUse.refreshTokenUsed.push(refreshToken);
        foundTokenUse.refreshToken = newRefreshToken;
        await foundTokenUse.save();

        return {
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
        };
    },
};
