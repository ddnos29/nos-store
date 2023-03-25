import { Request, Response, NextFunction } from 'express';
import { Test } from '../models/test.model';

export const test = async (req: Request, res: Response) => {
    const test = await Test.create({ name: 'test' });
    return res.status(200).json({ test });
};
