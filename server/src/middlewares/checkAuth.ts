import { Request, Response, NextFunction } from 'express';
import {
    AuthFailureError,
    BadRequestError,
} from '../exceptions/error.response';
import { verifyAccessToken } from '../utils/jwt';
import { ITokenPayload } from '../utils/jwt';

import { UserModel } from '../models/user.model';

import { ROLE } from '../constants/enum';

interface IUserRequest extends Request {
    user: ITokenPayload;
}

export const asyncHandler = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export const authentication = asyncHandler(
    async (req: IUserRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new AuthFailureError('Bạn chưa đăng nhập');
        }

        const accessToken = token.split(' ')[1];

        const decoded = await verifyAccessToken(accessToken).catch((err) => {
            throw new AuthFailureError(err.message);
        });

        if (!decoded) {
            throw new AuthFailureError('Invalid token');
        }
        const existUser = await UserModel.findById(decoded.userId);
        if (!existUser) throw new AuthFailureError('User not found');

        req.user = decoded;
        next();
    }
);

export const roleCheck = asyncHandler(
    async (req: IUserRequest, res: Response, next: NextFunction) => {
        const { role } = req.user;
        if (role !== ROLE.ADMIN) {
            throw new BadRequestError('Bạn không có quyền truy cập');
        }

        next();
    }
);
