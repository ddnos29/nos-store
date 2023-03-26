require('dotenv').config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import jsonwebtoken from 'jsonwebtoken';
//import route
import testRoute from './routes/test.route';
//import database
import { connect } from './database/db';


const app = express();
const PORT = process.env.PORT || 3000;

connect();

app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

if(process.env.NODE_ENV === 'Development') {
    app.use(morgan('dev'));
}

app.use('/test', testRoute);


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
