import express from 'express';
export interface PayloadType {
    userId: string;
    userRoleId: string;
}
export declare class AuthenticationService {
    getAccessToken(payload: PayloadType): string;
    verifyAccessToken: express.RequestHandler;
}
export default AuthenticationService;
//# sourceMappingURL=AuthenticationService.d.ts.map