"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
// const httpStatusCodes = require('./httpStatusCodes')
const ErrorMiddleware_1 = require("../../middleware/ErrorMiddleware");
const BaseError_1 = require("./BaseError");
class NotFoundException extends BaseError_1.BaseError {
    constructor(message, path) {
        super(ErrorMiddleware_1.ErrorCode.NotFound, message, path);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=NotFoundException.js.map