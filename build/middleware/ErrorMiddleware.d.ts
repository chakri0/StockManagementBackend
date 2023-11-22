import express from 'express';
import { BaseError } from '../common/exception/BaseError';
export type expressErrorCd = (error: BaseError, request: express.Request, response: express.Response, next: express.NextFunction) => void;
export declare enum ErrorCode {
    Undefined = 0,
    NotFound = 1,
    Unauthorised = 2,
    Forbidden = 3,
    BadRequest = 4,
    Conflict = 5
}
export declare class ErrorMiddleware {
    private logger;
    constructor();
    handler(): expressErrorCd;
    private static getCode;
}
declare const _default: expressErrorCd;
export default _default;
//# sourceMappingURL=ErrorMiddleware.d.ts.map