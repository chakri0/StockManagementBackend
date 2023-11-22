import { User } from '../entities/User';
import { UserRole } from '../entities/UserRole';
export declare class UserDatastore {
    constructor();
    getById(userId: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserRoleById(userId: string): Promise<UserRole | undefined>;
    save(user: User): Promise<User | undefined>;
    saveUserRole(userRole: UserRole): Promise<UserRole | undefined>;
    getUsersListByBranch(branchId: string): Promise<User[] | undefined>;
}
//# sourceMappingURL=UserDatastore.d.ts.map