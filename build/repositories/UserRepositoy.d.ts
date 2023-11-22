import { FormattedUserResponse } from '../common/helpers/ResponseHandle';
import { ILogin } from '../controllers/responseType/ILogin';
import { UserRole } from '../database/entities/UserRole';
export declare class UserRepository {
    private userDatastore;
    private accessTokenDatastore;
    private authentication;
    private passwordManager;
    private branchDatastore;
    private emailTokenDatastore;
    private mail;
    constructor();
    userLogin(email: string, password: string): Promise<ILogin>;
    userInvite(activeUserId: string, firstName: string, email: string, role: string, branchId: string): Promise<void>;
    sendSetUpMail(userRole: UserRole, email: string, firstName: string): Promise<void>;
    verifyUser(token: string, email: string): Promise<void>;
    accoutSetup(email: string, password: string): Promise<void>;
    getUsersListByBranchId(activeUserId: string, branchId: string): Promise<FormattedUserResponse[] | undefined>;
}
//# sourceMappingURL=UserRepositoy.d.ts.map