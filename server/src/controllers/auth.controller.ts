import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { authServices } from '@src/services/auth.service';
import { SuccessResponse } from '@src/exceptions/success.response';
import { BadRequestError } from '@src/exceptions/error.response';

import { STATUS_CODE } from '@src/constants/HttpStatusCodes';
import { tokenService } from '@src/services/token.service';

export const authController = {
    login: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            const result = await authServices.login(req.body, req.cookies);
            new SuccessResponse({
                data: result,
            }).sendCookie(res, {
                name: 'refreshToken',
                value: result.refresh_token,
                options: {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000,
                },
            });
            /* res.cookie('test2', 'test2', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.json('test'); */
        }
    },

    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        } else {
            new SuccessResponse({
                message: 'Đăng ký tài khoản thành công',
                data: await authServices.register(req.body),
                statusCode: STATUS_CODE.CREATED,
            }).send(res);
        }
    },

    refreshToken: async (req, res) => {
        const result = await tokenService.handleToken(req.body);

        console.log('refreshToken:', req.body);

        new SuccessResponse({
            data: result.access_token,
        }).send(res);
    },

    logout: async (req, res) => {
        new SuccessResponse({
            message: 'Đăng xuất thành công',
            data: await authServices.logout(req.body),
            statusCode: STATUS_CODE.NO_CONTENT,
        }).send(res);
        /* .clearCookie(res, {
            name: 'refreshToken',
            options: {
                httpOnly: true,
                sameSite: 'None',
                secure: false,
            },
        }); */
    },
};
