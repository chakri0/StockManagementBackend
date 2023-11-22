import { Branch } from '../../database/entities/Branch';
import { User } from '../../database/entities/User';
import { UserRole } from '../../database/entities/UserRole';
export interface FormattedUserResponse {
    id: string;
    email: string;
    firstName: string | undefined;
    lastName: string | undefined;
    avatar: string | undefined;
    phoneNumber: number | undefined;
    role: UserRole;
    branch: Branch;
}
export declare const userResponse: (user: User) => {
    id: string;
    email: string;
    firstName: string | undefined;
    lastName: string | undefined;
    avatar: string | undefined;
    phoneNumber: number | undefined;
    role: UserRole;
    branch: Branch;
};
export declare const userBranchResponse: (branch: Branch) => {
    id: string;
    storeName: string;
    storeAddress: string;
};
//# sourceMappingURL=ResponseHandle.d.ts.map