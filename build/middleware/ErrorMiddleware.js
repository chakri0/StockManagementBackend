"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = exports.ErrorCode = void 0;
const HttpStatus = __importStar(require("http-status-codes"));
const WinstonLogger_1 = require("../common/logging/WinstonLogger");
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Undefined"] = 0] = "Undefined";
    ErrorCode[ErrorCode["NotFound"] = 1] = "NotFound";
    ErrorCode[ErrorCode["Unauthorised"] = 2] = "Unauthorised";
    ErrorCode[ErrorCode["Forbidden"] = 3] = "Forbidden";
    ErrorCode[ErrorCode["BadRequest"] = 4] = "BadRequest";
    ErrorCode[ErrorCode["Conflict"] = 5] = "Conflict";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
class ErrorMiddleware {
    constructor() {
        this.logger = new WinstonLogger_1.WinstonLogger();
    }
    handler() {
        return (error, request, response, next) => {
            var _a;
            const status = error.errorCode;
            this.logger.error(error.message);
            this.logger.error((_a = error.stack) !== null && _a !== void 0 ? _a : '');
            const responseBody = {
                message: error.message || 'Something went wrong',
            };
            if (status === undefined && error.stack) {
                this.logger.error(error.stack);
            }
            const httpStatus = ErrorMiddleware.getCode(status);
            response.status(httpStatus).json(responseBody);
            if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
                next(error);
            }
        };
    }
    static getCode(errorCode) {
        switch (errorCode) {
            case ErrorCode.Unauthorised:
                return HttpStatus.UNAUTHORIZED;
            case ErrorCode.Forbidden:
                return HttpStatus.FORBIDDEN;
            case ErrorCode.NotFound:
                return HttpStatus.NOT_FOUND;
            case ErrorCode.BadRequest:
                return HttpStatus.BAD_REQUEST;
            case ErrorCode.Conflict:
                return HttpStatus.CONFLICT;
            default:
                return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
exports.default = new ErrorMiddleware().handler();
//# sourceMappingURL=ErrorMiddleware.js.map