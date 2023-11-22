/// <reference types="express-serve-static-core" />
import express from 'express';
export interface TypedRequestBody<T> extends Express.Request {
    body: T;
}
declare class BranchController {
    private branchRepository;
    constructor();
    addBranch: express.RequestHandler;
    branchList: express.RequestHandler;
    updateBranch: express.RequestHandler;
    deleteBranch: express.RequestHandler;
}
export default BranchController;
//# sourceMappingURL=BranchController.d.ts.map