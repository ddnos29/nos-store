import { Request, Response } from 'express';
import { authServices } from '../services/auth.service';

import { SuccessResponse } from '../exceptions/success.response';
export const authController = {
    login: async (req: Request, res: Response) => {
        /* try {
            const { email, password } = req.body;
            const { accessToken, refreshToken, user } = await authServices.login(email, password);
            res.status(200).json({ user, access_token: accessToken, refresh_token: refreshToken });
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        } */

        new SuccessResponse({
            metadata:await authServices.login(req.body),
        }).send(res);
    },

    register: async (req, res) => {
        try {
            const { email, password, name, phone, address } = req.body;
            const user = await authServices.register(email, password, name, phone, address);

            res.status(200).json({ message: 'Đăng ký tài khoản thành công', user, status: 'succes' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ mesage: error, status: 'error' });
        }
    },

    refreshToken: async (req, res) => {
        try {
            const token = req.body.token;
            const refreshToken = await authServices.refreshToken(token);
            res.status(200).json(refreshToken);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    logout: async (req, res) => {
        try {
            const token = req.body.token;
            const logout = await authServices.logout(token);
            res.status(200).json(logout);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};
