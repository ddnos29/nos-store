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
                    sameSite: 'None',
                    maxAge: 24 * 60 * 60 * 1000,
                },
            });
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
        const result = await tokenService.handleToken(req.cookies);
        new SuccessResponse({
            data: result.access_token,
        }).clearCookieAndSend(res, {
            name: 'refreshToken',
            value: result.refresh_token,
            options: {
                httpOnly: true,
                secure: false,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000,
            },
        });
    },

    logout: async (req, res) => {
        new SuccessResponse({
            message: 'Đăng xuất thành công',
            statusCode: STATUS_CODE.NO_CONTENT,
        }).clearCookie(res, {
            name: 'refreshToken',
            options: {
                httpOnly: true,
                sameSite: 'None',
                secure: false,
            },
        });
    },
};
