import { STATUS_CODE, REASON_PHRASES } from '../constants/HttpStatusCodes';

export class SuccessResponse {
    message: string;
    statusCode: number;
    reasonStatusCode: string;
    metadata: any;
    status: string;

    constructor({ message = '', statusCode = STATUS_CODE.OK, reasonStatusCode = REASON_PHRASES.OK, metadata = {}, status = 'success' }) {
        this.message = !message ? reasonStatusCode : message;
        this.statusCode = statusCode;
        this.reasonStatusCode = reasonStatusCode;
        this.metadata = metadata;
        this.status = status;
    }

    send(res, headers = {}) {
        res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor(message, metadata = {}) {
        super({
            message,
            metadata,
        });
    }
}
