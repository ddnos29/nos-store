import { STATUS_CODE, REASON_PHRASES } from '../constants/HttpStatusCodes';

export class SuccessResponse {
    message: string;
    statusCode: number;
    reasonStatusCode: string;
    data: any;
    status: string;

    constructor({
        message = '',
        statusCode = STATUS_CODE.OK,
        reasonStatusCode = REASON_PHRASES.OK,
        data = {},
        status = 'success',
    }) {
        this.message = !message ? reasonStatusCode : message;
        this.statusCode = statusCode;
        this.reasonStatusCode = reasonStatusCode;
        this.data = data;
        this.status = status;
    }

    send(res, headers = {}) {
        res.status(this.statusCode).json(this);
    }
    sendCookie(res, cookie) {
        res.cookie(cookie.name, cookie.value, cookie.options)
        return this.send(res);
    }

    clearCookie(res, cookie) {
        res.clearCookie(cookie.name, cookie.options)
        return this.send(res);
    }

    async clearCookieAndSend(res, cookie) {
        await res.clearCookie(cookie.name, cookie.options)
        await res.cookie(cookie.name, cookie.value, cookie.options)
        return this.send(res);
    }
}

class OK extends SuccessResponse {
    constructor(message, data = {}) {
        super({
            message,
            data,
        });
    }
}

export class NoContent extends SuccessResponse {
    constructor(message, data = {}) {
        super({
            message,
            statusCode: STATUS_CODE.NO_CONTENT,
            reasonStatusCode: REASON_PHRASES.NO_CONTENT,
            data,
        });
    }
}