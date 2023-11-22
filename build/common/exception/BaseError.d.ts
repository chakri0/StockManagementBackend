export declare class BaseError extends Error {
    errorCode: number;
    readonly path?: string;
    constructor(errorCode: number, message: string, path?: string);
}
//# sourceMappingURL=BaseError.d.ts.map