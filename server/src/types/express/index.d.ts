import { Request } from 'express';

import { ITokenPayload } from '../../utils/jwt';

// **** Declaration Merging **** //

declare module 'express' {
    export interface Request {
        user?: ITokenPayload;
    }
}
