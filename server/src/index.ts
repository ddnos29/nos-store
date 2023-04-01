
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';

//import route
import testRoute from './routes/test.route';
import authRoute from './routes/auth.route';
import brandRoute from './routes/brand.route';
import categoryRoute from './routes/category.route';
import productRoute from './routes/product.route';
import couponRoute from './routes/coupon.route';

import dotenv from 'dotenv';
dotenv.config();

//import database
import { connect } from './database/init.mongo';

const app = express();
const PORT = process.env.PORT || 3000;

connect();

app.use(
    cors({
        credentials: true,
    })
);

// app.use(multer.array());
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);

if (process.env.NODE_ENV === 'Development') {
    app.use(morgan('dev'));
}

app.use('/api/test', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/brand', brandRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/coupon', couponRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const statusType = error.statusType || 'error';
    return res.status(status).json({
        error: {
            status: statusType,
            message: error.message || 'Internal Server Error',
            code: status,
        },
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
