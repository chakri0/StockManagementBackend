import { BaseEntity } from 'typeorm';
import { UserRole } from './UserRole';
export declare class RefreshToken extends BaseEntity {
    id: string;
    role: UserRole;
    token: string;
    slackToken: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=RefreshToken.d.ts.map