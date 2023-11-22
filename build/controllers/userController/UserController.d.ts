/// <reference types="express-serve-static-core" />
import express from 'express';
export interface TypedRequestBody<T> extends Express.Request {
    body: T;
}
declare class UserController {
    private userRepository;
    constructor();
    userLogin: express.RequestHandler;
    profile: express.RequestHandler;
    inviteUser: express.RequestHandler;
    verifyUser: express.RequestHandler;
    accoutSetup: express.RequestHandler;
    usersListByBranch: express.RequestHandler;
}
export default UserController;
//# sourceMappingURL=UserController.d.ts.map