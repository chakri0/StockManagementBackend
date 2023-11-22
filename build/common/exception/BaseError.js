"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(errorCode, message, path) {
        super(message);
        // Object.setPrototypeOf(this, new.target.prototype);
        // this.name = name;
        this.errorCode = errorCode;
        this.path = path;
        // Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map