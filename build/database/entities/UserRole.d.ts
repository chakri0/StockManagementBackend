import { User } from './User';
export declare enum roleName {
    superAdmin = "superAdmin",
    admin = "admin",
    manager = "manager"
}
export declare class UserRole {
    id: string;
    user: User;
    roleName: string;
    isVerified: boolean;
    isActivated: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=UserRole.d.ts.map