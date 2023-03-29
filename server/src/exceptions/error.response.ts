import { STATUS_CODE, REASON_PHRASES } from '../constants/HttpStatusCodes';

export class ErrorResponse extends Error {
    status: number;
    constructor(message: string, status: number = STATUS_CODE.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status;
    }

    send(res) {
        res.status(this.status).json(this);
    }
}

export class ConflictRequestError extends ErrorResponse {
    constructor(message: string = REASON_PHRASES.CONFLICT, statusCode: number = STATUS_CODE.CONFLICT) {
        super(message, statusCode);
    }
}

export class BadRequestError extends ErrorResponse {
    constructor(message: string = REASON_PHRASES.BAD_REQUEST, statusCode: number = STATUS_CODE.BAD_REQUEST) {
        super(message, statusCode);
    }
}

export class AuthFailureError extends ErrorResponse {
    constructor(message: string = REASON_PHRASES.UNAUTHORIZED, statusCode: number = STATUS_CODE.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
