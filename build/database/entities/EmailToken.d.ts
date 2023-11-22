import { BaseEntity } from 'typeorm';
import { UserRole } from './UserRole';
export declare enum tokenType {
    forgotPassword = "forgotpassword",
    registration = "registration",
    invite = "invite"
}
export declare class EmailToken extends BaseEntity {
    id: string;
    role: UserRole;
    token: string;
    tokenType: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=EmailToken.d.ts.map